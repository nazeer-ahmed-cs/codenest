import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    return Promise.reject(
      new Error("Please define the MONGODB_URI environment variable")
    );
  }

  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    return globalWithMongo._mongoClientPromise;
  }

  const client = new MongoClient(uri, options);
  return client.connect();
}

const clientPromise = getClientPromise();

export default clientPromise;
