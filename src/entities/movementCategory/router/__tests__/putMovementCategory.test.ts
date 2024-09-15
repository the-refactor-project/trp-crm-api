import request from "supertest";
import app from "../../../../server/app";
import MovementCategory from "../../model/MovementCategory";
import { MovementCategoryEntity } from "../../MovementCategoryEntity";
import { Types } from "mongoose";
import { mockMovementCategoriesFactory } from "../../factories/movementCategoriesFactory";

afterEach(async () => {
  await MovementCategory.deleteMany();
});

describe("Given a PUT /movement-categories/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated category", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();
      const updatedMovementCategoryName = movementCategory.name + "!!";

      await MovementCategory.create(movementCategory);

      const updatedMovementCategory: MovementCategoryEntity = {
        ...movementCategory,
        name: updatedMovementCategoryName,
      };

      const response = await request(app)
        .put("/movement-categories")
        .send(updatedMovementCategory)
        .expect(200);

      const responseBody = response.body as {
        updatedCategory: MovementCategoryEntity;
      };

      expect(responseBody.updatedCategory).toEqual(
        expect.objectContaining({
          name: updatedMovementCategoryName,
        }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Category not found", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();

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
      const movementCategory = mockMovementCategoriesFactory.createOne();

      movementCategory._id = "invalid-id" as unknown as Types.ObjectId;

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
