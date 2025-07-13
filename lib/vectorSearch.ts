import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { HuggingFaceEmbeddings } from "@/lib/createEmbedding";

const MONGODB_URI = process.env.DATABASE_URI!;
const DB_NAME = "test";
const COLLECTION_NAME = "filieres";

export async function getVectorStore() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const embeddings = new HuggingFaceEmbeddings(process.env.HF_API_KEY!);

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: "default",
    textKey: "summaryText",
    embeddingKey: "vectorizedTextSummary",
  });

  return { vectorStore, client };
}
