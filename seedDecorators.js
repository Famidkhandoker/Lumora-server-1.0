import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config();

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@lumoracluster.y65imfg.mongodb.net/?appName=LumoraCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

const decorators = [
  {
    displayName: "Famid Khandoker",
    email: "famidkhandoker@gmail.com",
    role: "decorator",
    isApproved: true,
    photoURL: "/images/decorators/famid.jpg",
    createdAt: new Date(),
  },
  {
    displayName: "Tasmia Azam Neeti",
    email: "tasmiaazamneeti@gmail.com",
    role: "decorator",
    isApproved: true,
    photoURL: "/images/decorators/tasmia.jpg",
    createdAt: new Date(),
  },
  {
    displayName: "Muhtadin Munjin",
    email: "muhtadinmunjin@gmail.com",
    role: "decorator",
    isApproved: true,
    photoURL: "/images/decorators/munjin.jpg",
    createdAt: new Date(),
  },
  {
    displayName: "Ryin Akand",
    email: "ryinakand@gmail.com",
    role: "decorator",
    isApproved: true,
    photoURL: "/images/decorators/ryin.jpg",
    createdAt: new Date(),
  },
];

async function seedDecorators() {
  try {
    await client.connect();

    const db = client.db("LumoraDB");
    const usersCollection = db.collection("users");

    for (const decorator of decorators) {
      await usersCollection.updateOne(
        { email: decorator.email },
        { $set: decorator },
        { upsert: true }
      );
    }

    console.log("4 decorators added successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

seedDecorators();