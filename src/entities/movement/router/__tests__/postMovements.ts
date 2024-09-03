import request from "supertest";
import app from "../../../../server/app";
import { MovementEntity, MovementEntityData } from "../../MovementEntity";
import { createMockMovementDatas } from "../../factories/movementsFactory";
import MovementDto from "../../dto/movementDto";

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
          new MovementDto(newMovementData as MovementEntity),
        ),
      );
    });
  });

  describe("When it receives a request with a new movement's data without date and quantity", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newMovementData = createMockMovementDatas(1)[0];

      const wrongNewMovementData: Partial<MovementEntityData> = {
        ...newMovementData,
      };

      delete wrongNewMovementData.date;
      delete wrongNewMovementData.quantity;

      const response = await request(app)
        .post("/movements")
        .send(wrongNewMovementData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
