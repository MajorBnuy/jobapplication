import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) return;
  if (!process.env.MONGODB_URL) {
    throw new Error('Missing MONGODB_URL');
  }
  await mongoose.connect(process.env.MONGODB_URL);
  isConnected = true;
}