import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient>;

function connect(): Promise<MongoClient> {
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

export async function connectToDatabase() {
  if (!clientPromise) {
    clientPromise = connect();
  }
  return clientPromise;
}

export default connectToDatabase;
