import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../../server/app";
import connectToDb from "../../../database";
import Movement from "../../model/Movement";
import { MovementEntity } from "../../MovementEntity";
import { createMockMovements } from "../../factories/movementsFactory";
import MovementDto from "../../dto/movementDto";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDb(server.getUri());
});

describe("Given a GET /movements endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two movements 'test in' and 'test out'", async () => {
      const movements = createMockMovements(2);

      for await (const movement of movements) {
        await Movement.create(movement);
      }

      const response = await request(app).get("/movements").expect(200);

      const responseBody: {
        movements: MovementEntity[];
      } = response.body;

      movements.forEach((movement, index) => {
        expect(responseBody.movements[index]).toEqual(
          expect.objectContaining(new MovementDto(movement))
        );
      });
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
