import request from "supertest";
import app from "../../../../server/app";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../../MovementCategoryEntity";
import { mockMovementCategoriesFactory } from "../../factories/movementCategoriesFactory";

describe("Given a POST /movement-categories endpoint", () => {
  describe("When it receives a request with a new category's data", () => {
    test("Then it should respond with 201 and the new category", async () => {
      const newMovementCategoryData =
        mockMovementCategoriesFactory.createOneItemData();

      const response = await request(app)
        .post("/movement-categories")
        .send(newMovementCategoryData)
        .expect(201);

      const responseBody: {
        category: MovementCategoryEntity;
      } = response.body;

      expect(responseBody.category).toEqual(
        expect.objectContaining(newMovementCategoryData),
      );
    });
  });

  describe("When it receives a request with a new category's data without name", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newMovementCategoryData =
        mockMovementCategoriesFactory.createOneItemData();

      const wrongNewMovementCategoryData: Partial<MovementCategoryEntityData> =
        {
          ...newMovementCategoryData,
        };

      delete wrongNewMovementCategoryData.name;

      const response = await request(app)
        .post("/movement-categories")
        .send(wrongNewMovementCategoryData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
