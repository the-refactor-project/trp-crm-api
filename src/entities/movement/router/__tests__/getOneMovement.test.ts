import request from "supertest";
import app from "../../../../server/app";
import Movement from "../../model/Movement";
import { MovementEntity } from "../../MovementEntity";
import MovementDto from "../../dto/movementDto";
import { mockMovementsFactory } from "../../factories/movementsFactory";

afterEach(async () => {
  await Movement.deleteMany();
});

describe("Given a GET /movements/:movementId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the movement", async () => {
      const movement = mockMovementsFactory.createOne();

      await Movement.create(movement);

      const response = await request(app)
        .get(`/movements/${movement._id}`)
        .expect(200);

      const responseBody = response.body as {
        movement: MovementEntity;
      };

      expect(responseBody.movement).toEqual(
        expect.objectContaining(new MovementDto(movement)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Movement not found", async () => {
      const movement = mockMovementsFactory.createOne();

      const response = await request(app)
        .get(`/movements/${movement._id}`)
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
        .get(`/movements/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
