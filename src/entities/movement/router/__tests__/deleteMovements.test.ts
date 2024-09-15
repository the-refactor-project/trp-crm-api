import request from "supertest";
import app from "../../../../server/app";
import { mockMovementFactory } from "../../factories/movementsFactory";
import Movement from "../../model/Movement";

afterEach(async () => {
  await Movement.deleteMany();
});

describe("Given a DELETE /movements/:movementId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const movement = mockMovementFactory.createOne();

      await Movement.create(movement);

      await request(app).delete(`/movements/${movement._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Movement not found", async () => {
      const movement = mockMovementFactory.createOne();

      const response = await request(app)
        .delete(`/movements/${movement._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Movement not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .delete(`/movements/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
