import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDb from "./database";
import mongoose from "mongoose";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDb(server.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
