import { MongoClient } from "mongodb";
import { createEmbedding } from "@/lib/createEmbedding"; 

const MONGODB_URI = process.env.DATABASE_URI!;
const DB_NAME = "test";
const COLLECTION_NAME = "filieres";

const client = new MongoClient(MONGODB_URI);

export async function vectorSearch(query: string, topK = 3) {
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION_NAME);

  const queryEmbedding = await createEmbedding(query);

  const results = await collection.aggregate([
    {
      $vectorSearch: {
        queryVector: queryEmbedding,
        path: "vectorizedTextSummary",
        numCandidates: 50,
        limit: topK,
        index: "default", // replace if your index name is different
      },
    },
    {
      $project: {
        summaryText: 1,
        vectorMetadata: 1,
        score: { $meta: "vectorSearchScore" },
      },
    },
  ]).toArray();

  await client.close();
  return results;
}
