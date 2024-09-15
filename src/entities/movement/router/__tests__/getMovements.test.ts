import request from "supertest";
import app from "../../../../server/app";
import Movement from "../../model/Movement";
import { MovementEntity } from "../../MovementEntity";
import MovementDto from "../../dto/movementDto";
import { mockMovementsFactory } from "../../factories/movementsFactory";

afterEach(async () => {
  await Movement.deleteMany();
});

describe("Given a GET /movements endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two movements 'test in' and 'test out'", async () => {
      const movements = mockMovementsFactory.createMany(2);

      for await (const movement of movements) {
        await Movement.create(movement);
      }

      const response = await request(app).get("/movements").expect(200);

      const responseBody: {
        movements: MovementEntity[];
      } = response.body;

      movements.forEach((movement, index) => {
        expect(responseBody.movements[index]).toEqual(
          expect.objectContaining(new MovementDto(movement)),
        );
      });
    });
  });
});
