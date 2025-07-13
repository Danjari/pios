import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, Annotation } from "@langchain/langgraph";
//import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getVectorStore } from "@/lib/vectorSearch";
import { HumanMessage, AIMessage,BaseMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

export async function callAgent(query: string, threadId: string) {
  const { vectorStore, client } = await getVectorStore();

  // Create tool for filière lookup
  const filiereLookupTool = tool(
    async ({ query, n = 5 }) => {
      console.log("🔍 Filière lookup tool called");
  
      const results = await vectorStore.similaritySearchWithScore(query, n);
      console.log("Vector results raw:", JSON.stringify(results, null, 2));

  
      return JSON.stringify(
        results.map((r) => ({
          summary: r[0].pageContent,
          link: r[0].metadata.vectorMetadata?.link || "",
          nomDeFiliere: r[0].metadata.vectorMetadata?.nomDeFiliere || "",
          score: r[1],
        }))
      );
    },
    {
      name: "filiere_lookup",
      description: "Cherche des informations sur les filières.",
      schema: z.object({
        query: z.string().describe("La requête de recherche"),
        n: z.number().optional().default(3).describe("Nombre de résultats à retourner"),
      }),
    }
  );
  
  // State
  const GraphState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
      reducer: (x, y) => x.concat(y),
    }),
  });

  // Tools node
  const tools = [filiereLookupTool];
  const toolNode = new ToolNode<typeof GraphState.State>(tools);

  // Chat model with Gemini
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.75,
    maxOutputTokens: 4096,
    apiKey: process.env.GEMINI_API_KEY,
  }).bindTools(tools);

  // Prompt
  async function callModel(state: typeof GraphState.State) {
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Tu es un assistant AI d'orientation académique sur la platforme. Utilise les outils disponibles pour aider les étudiants. Si tu ne peux pas répondre complètement, dis-le clairement. Prefixe ta réponse finale avec "FINAL ANSWER".`,
      ],
      new MessagesPlaceholder("messages"),
    ]);

    const formatted = await prompt.formatMessages({
      messages: state.messages,
    });

    const result = await model.invoke(formatted);
    return { messages: [result] };
  }

  // Decide when to call tools or end
  function shouldContinue(state: typeof GraphState.State) {
    const messages = state.messages;
    const last = messages[messages.length - 1] as AIMessage;
    if (last.tool_calls?.length) {
      return "tools";
    }
    return "__end__";
  }

  // Build workflow
  const workflow = new StateGraph(GraphState)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");

  const app = workflow.compile();

  // Run
  const finalState = await app.invoke(
    {
      messages: [new HumanMessage(query)],
    },
    { recursionLimit: 15, configurable: { thread_id: threadId } }
  );

  await client.close();

  return finalState.messages[finalState.messages.length - 1].content;
}
