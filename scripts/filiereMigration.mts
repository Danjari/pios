import 'dotenv/config';

import { MongoClient } from "mongodb";
import { buildFiliereSummary } from "../lib/summaries/BuildFiliereSummary.js";

const MONGODB_URI = process.env.DATABASE_URI!;
const DB_NAME = "test"; // ← your DB name
const COLLECTION_NAME = "filieres";

async function migrate() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const filieres = await collection.find({}).toArray();
    console.log(`ℹ️ Found ${filieres.length} filières.`);

    for (const filiere of filieres) {
      const summaryText = buildFiliereSummary({
        nomDeFiliere: filiere.nomDeFiliere,
        category: filiere.category,
        duration: filiere.duration,
        bacRequired: filiere.bacRequired || [],
        locations: filiere.locations || [],
        descriptionCourte: filiere.descriptionCourte,
        longDescription_html: filiere.longDescription_html,
        prerequisites: filiere.prerequisites,
        careerOpportunities: filiere.careerOpportunities,
        universities: filiere.universities || [],
      });

      await collection.updateOne(
        { _id: filiere._id },
        { $set: { summaryText } }
      );

      console.log(`✅ Updated: ${filiere.nomDeFiliere}`);
    }

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

migrate();
