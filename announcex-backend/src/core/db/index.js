import { connectMongo } from "./mongo.client.js";

export async function initDatabase() {
  await connectMongo();
}
