import request from "supertest";
import app from "../../../server/app";
import { createMockMovements } from "../../factories/movementsFactory";
import Movement from "../../model/Movement";
import { MovementEntity } from "../../MovementEntity";
import MovementDto from "../../dto/movementDto";

afterEach(async () => {
  await Movement.deleteMany();
});

describe("Given a PUT /movements/:movementId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated movement", async () => {
      const movement = createMockMovements(1)[0];

      await Movement.create(movement);

      const updatedMovement: MovementEntity = {
        ...movement,
        quantity: movement.quantity + 10,
      };

      const response = await request(app)
        .put("/movements")
        .send(updatedMovement)
        .expect(200);

      const responseBody = response.body as {
        movement: MovementEntity;
      };

      expect(responseBody.movement).toEqual(
        expect.objectContaining(new MovementDto(updatedMovement)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Movement not found", async () => {
      const movement = createMockMovements(1)[0];

      const response = await request(app)
        .put("/movements")
        .send(movement)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Movement not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const movement = createMockMovements(1)[0];

      movement._id = "invalid-id";

      const response = await request(app)
        .put("/movements")
        .send(movement)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
