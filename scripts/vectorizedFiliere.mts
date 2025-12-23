import 'dotenv/config';
import { MongoClient } from "mongodb";
import { HfInference } from "@huggingface/inference";

const MONGODB_URI = process.env.DATABASE_URI!;
const DB_NAME = "test";
const COLLECTION_NAME = "filieres";

const hf = new HfInference(process.env.HF_API_KEY!);
const client = new MongoClient(MONGODB_URI);

async function createEmbedding(text: string) {
  const res = await hf.featureExtraction({
    model: "intfloat/e5-large-v2",
    inputs: text,
  });
  return res; // embedding vector
}

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const filieres = await collection.find({}).toArray();
    console.log(`ℹ️ Found ${filieres.length} filières.`);

    for (const filiere of filieres) {
      const summary = filiere.summaryText;
      if (!summary) {
        console.log(`⚠️ No summary for: ${filiere.nomDeFiliere}`);
        continue;
      }

      console.log(`Embedding: ${filiere.nomDeFiliere}...`);
      const embedding = await createEmbedding(summary);
      const link = `/filieres/${filiere.slug}`;
      // update the filiere with the embedding and the link and the name of the filiere
      await collection.updateOne(
        { _id: filiere._id },
        {
          $set: {
            vectorizedTextSummary: embedding,
            vectorMetadata: {
              link,
              nomDeFiliere: filiere.nomDeFiliere,
            },
          },
        }
      )

      console.log(`✅ Updated: ${filiere.nomDeFiliere}`);
    }

    console.log("🎉 Embedding script completed!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

run();
