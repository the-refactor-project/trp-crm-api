import request from "supertest";
import app from "../../../../server/app";
import { createMockMovementCategories } from "../../factories/movementCategoriesFactory";
import MovementCategoryDto from "../../dto/movementCategoryDto";
import MovementCategory from "../../model/MovementCategory";
import { MovementCategoryEntity } from "../../MovementCategoryEntity";

afterEach(async () => {
  await MovementCategory.deleteMany();
});

describe("Given a PUT /movement-categories/:movementCategoryId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated category", async () => {
      const movementCategory = createMockMovementCategories(1)[0];

      await MovementCategory.create(movementCategory);

      const updatedMovementCategory: MovementCategoryEntity = {
        ...movementCategory,
        name: movementCategory.name + "!!",
      };

      const response = await request(app)
        .put("/movement-categories")
        .send(updatedMovementCategory)
        .expect(200);

      const responseBody = response.body as {
        movementCategory: MovementCategoryEntity;
      };

      expect(responseBody.movementCategory).toEqual(
        expect.objectContaining(
          new MovementCategoryDto(updatedMovementCategory),
        ),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Category not found", async () => {
      const movementCategory = createMockMovementCategories(1)[0];

      const response = await request(app)
        .put("/movement-categories")
        .send(movementCategory)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Category not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const movementCategory = createMockMovementCategories(1)[0];

      movementCategory._id = "invalid-id";

      const response = await request(app)
        .put("/movement-categories")
        .send(movementCategory)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
