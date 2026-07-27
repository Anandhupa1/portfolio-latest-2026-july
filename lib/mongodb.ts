import { MongoClient, type Db } from "mongodb";

const options = {
  appName: "anandhu-portfolio",
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local (MONGODB_URI)");
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse the client across HMR so we don't exhaust Atlas connection pools.
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri, options);
  return client.connect();
}

/** Shared MongoClient promise — cached in development for Next.js HMR. */
export default function getClientPromise(): Promise<MongoClient> {
  return createClientPromise();
}

export async function getDb(): Promise<Db> {
  const client = await createClientPromise();
  return client.db(process.env.MONGODB_DB || "portfolio");
}
