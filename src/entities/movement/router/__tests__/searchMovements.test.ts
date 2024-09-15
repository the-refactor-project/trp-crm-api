import request from "supertest";
import app from "../../../../server/app";
import { minDebounceAllowedLength } from "../../../../const";
import Movement from "../../model/Movement";
import { mockMovementsFactory } from "../../factories/movementsFactory";
import { MovementEntity } from "../../MovementEntity";

afterEach(async () => {
  await Movement.deleteMany();
});

describe("Given a GET /movements/search endpoint", () => {
  const search = "Test";
  const movementDescription = `${search} movement`;
  const movement1 = mockMovementsFactory.createOne({
    description: movementDescription,
  });
  const movement2 = mockMovementsFactory.createOne({
    description: "Another movement",
  });

  describe("When it receives a request with a search 'test'", () => {
    test("Then it should respond with 200 and the movement 'Test movement'", async () => {
      await Movement.create(movement1);
      await Movement.create(movement2);

      const response = await request(app)
        .get(`/movements/search/${search}`)
        .expect(200);

      const responseBody = response.body as {
        movements: MovementEntity[];
      };

      expect(responseBody.movements).toHaveLength(1);
      expect(responseBody.movements).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            description: movement1.description,
          }),
        ]),
      );
    });
  });

  describe("When it receives a request with a non matching search 'inexistent'", () => {
    test("Then it should respond with 200 and no movements", async () => {
      const response = await request(app)
        .get(`/movements/search/inexistent`)
        .expect(200);

      const responseBody: {
        movements: MovementEntity[];
      } = response.body;

      expect(responseBody.movements).toHaveLength(0);
    });
  });

  describe("When it receives a request with a search 'te'", () => {
    test("Then it should respond with 400 and an error", async () => {
      const response = await request(app)
        .get(`/movements/search/te`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe(
        `Search string must be ${minDebounceAllowedLength} chars long at least`,
      );
    });
  });
});
