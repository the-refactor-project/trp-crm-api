import request from "supertest";
import app from "../../../../server/app";
import MovementCategory from "../../model/MovementCategory";
import { MovementCategoryEntity } from "../../MovementCategoryEntity";
import { mockMovementCategoriesFactory } from "../../factories/movementCategoriesFactory";

afterEach(async () => {
  await MovementCategory.deleteMany();
});

describe("Given a GET /movement-categories/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the category", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();

      await MovementCategory.create(movementCategory);

      const response = await request(app)
        .get(`/movement-categories/${movementCategory._id}`)
        .expect(200);

      const responseBody = response.body as {
        category: MovementCategoryEntity;
      };

      expect(responseBody.category).toEqual(
        expect.objectContaining({ name: movementCategory.name }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Category not found", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();

      const response = await request(app)
        .get(`/movement-categories/${movementCategory._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Category not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .get(`/movement-categories/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
