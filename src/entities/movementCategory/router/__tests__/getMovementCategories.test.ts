import request from "supertest";
import app from "../../../../server/app";
import MovementCategory from "../../model/MovementCategory";
import { MovementCategoryEntity } from "../../MovementCategoryEntity";
import { mockMovementCategoriesFactory } from "../../factories/movementCategoriesFactory";

afterEach(async () => {
  await MovementCategory.deleteMany();
});

describe("Given a GET /movement-categories endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two movement categories 'category A' and 'category B'", async () => {
      const movementCategories = mockMovementCategoriesFactory.createMany(2);

      for await (const movementCategory of movementCategories) {
        await MovementCategory.create(movementCategory);
      }

      const response = await request(app)
        .get("/movement-categories")
        .expect(200);

      const responseBody: {
        categories: MovementCategoryEntity[];
      } = response.body;

      movementCategories.forEach((movementCategory, index) => {
        expect(responseBody.categories[index]).toEqual(
          expect.objectContaining({ name: movementCategory.name }),
        );
      });
    });
  });
});
