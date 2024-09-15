import request from "supertest";
import app from "../../../../server/app";
import MovementCategory from "../../model/MovementCategory";
import { mockMovementCategoriesFactory } from "../../factories/movementCategoriesFactory";

afterEach(async () => {
  await MovementCategory.deleteMany();
});

describe("Given a DELETE /movement-categories/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();

      await MovementCategory.create(movementCategory);

      await request(app)
        .delete(`/movement-categories/${movementCategory._id}`)
        .expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Category not found", async () => {
      const movementCategory = mockMovementCategoriesFactory.createOne();

      const response = await request(app)
        .delete(`/movement-categories/${movementCategory._id}`)
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
        .delete(`/movement-categories/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
