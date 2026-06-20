import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your .env.local file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected Successfully");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;