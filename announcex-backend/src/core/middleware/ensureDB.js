import { connectMongo } from "../db/mongo.client.js";

export async function ensureDB(req, res, next) {
  try {
    await connectMongo();
    next();
  } catch (err) {
    next(err);
  }
}
