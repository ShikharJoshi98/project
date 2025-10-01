import dotenv from "dotenv"; 
import { MongoClient } from "mongodb";

dotenv.config();
async function clearCollections() {
  const uri = process.env.MONGO_URI; 
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("project_db");
    const collections = await db.listCollections().toArray();

    for (const coll of collections) {
      await db.collection(coll.name).deleteMany({});
      console.log(`✅ Cleared data from collection: ${coll.name}`);
    }

    console.log("🎉 All data cleared, collections/models remain.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}


clearCollections();
