import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app";
import connectToDb from "../../../database";
import { MovementEntity } from "../../MovementEntity";
import { createMockMovementDatas } from "../../factories/movementsFactory";
import MovementDto from "../../dto/movementDto";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDb(server.getUri());
});

describe("Given a POST /movements endpoint", () => {
  describe("When it receives a request with a new movement's data", () => {
    test("Then it should respond with 201 and the new movement", async () => {
      const newMovementData = createMockMovementDatas(1)[0];

      const response = await request(app)
        .post("/movements")
        .send(newMovementData)
        .expect(201);

      const responseBody: {
        movement: MovementEntity;
      } = response.body;

      expect(responseBody.movement).toEqual(
        expect.objectContaining(
          new MovementDto(newMovementData as MovementEntity)
        )
      );
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
