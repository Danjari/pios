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
      //console.log("Vector results raw:", JSON.stringify(results, null, 2));

  
      return JSON.stringify(
        results.map((r) => {
          const link = r[0].metadata.vectorMetadata?.link || "";
          const name = r[0].metadata.vectorMetadata?.nomDeFiliere || "Détails";
          return {
            summary: r[0].pageContent,
            link: `[Voir la filière ${name}](${link})`,
            score: r[1],
          };
        })
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
        `Tu es un assistant AI spécialisé dans l’orientation académique sur la plateforme PIOS, ton nom est Enca.Ton rôle est d’aider les étudiants à découvrir les filières qui leur correspondent, avec empathie, clarté et engagement.
      
      Utilise les outils à ta disposition pour chercher les informations utiles. Quand tu parles d’une filière, pense à toujours inclure un lien direct vers la ressource — même si l’utilisateur ne l’a pas explicitement demandé.
      
      Si tu ne peux pas répondre précisément, sois honnête et propose une alternative (ex: poser une question de clarification ou suggérer une recherche liée).
      
      Adopte un ton accueillant, rassurant, presque comme un conseiller humain. Évite les formulations trop mécaniques ou robotiques.
      
      Termine toujours ta réponse finale par "FINAL ANSWER" avant le contenu, même si la réponse est partielle ou incertaine.`
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
  const finalMessage = finalState.messages[finalState.messages.length - 1];

let finalContentText = "";

if (typeof finalMessage.content === "string") {
  finalContentText = finalMessage.content;
} else if (Array.isArray(finalMessage.content)) {
  // In most cases, you'll want to join all pieces if it's an array
  finalContentText = finalMessage.content.map(part => {
    if (typeof part === "string") return part;
    if ("text" in part && typeof part.text === "string") return part.text;
    return "";
  }).join(" ");
} else {
  // fallback, in case it's an unexpected type
  finalContentText = String(finalMessage.content);
}

  // Remove "FINAL ANSWER" prefix
  const cleanContent = finalContentText.replace(/^FINAL ANSWER\s*:?/i, "").trim();

return cleanContent;
}
