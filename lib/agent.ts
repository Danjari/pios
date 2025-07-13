import { Graph } from "langgraphjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { vectorSearch } from "@/lib/vectorSearch";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function runAgent(question: string) {
  const graph = new Graph();

  // Node 1: Retrieve context
  graph.addNode("retrieve", async (input: { question: string }) => {
    const results = await vectorSearch(input.question, 3);
    const context = results.map(r => r.summaryText).join("\n\n");

    // Also include metadata for links
    const links = results.map(r => {
      if (r.vectorMetadata?.link) {
        return `👉 [En savoir plus sur ${r.vectorMetadata.nomDeFiliere}](${r.vectorMetadata.link})`;
      }
      return "";
    }).join("\n\n");

    return { question: input.question, context, links };
  });

  // Node 2: Generate answer
  graph.addNode("answer", async (input: { question: string; context: string; links: string }) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Réponds à la question suivante en utilisant ce contexte:\n\n${input.context}\n\nQuestion: ${input.question}\n\nSi possible, propose aussi des liens pour en savoir plus:\n${input.links}`;

    const result = await model.generateContent(prompt);
    return { answer: result.response.text() };
  });

  // Connect nodes
  graph.addEdge("retrieve", "answer");

  // Execute
  const response = await graph.invoke({ question });
  return response.answer;
}
