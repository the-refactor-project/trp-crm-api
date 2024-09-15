import request from "supertest";
import app from "../../../../server/app";
import Expense from "../../model/Expense";
import { mockExpensesFactory } from "../../factories/expensesFactory";

afterEach(async () => {
  await Expense.deleteMany();
});

describe("Given a DELETE /expenses/:expenseId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200", async () => {
      const expense = mockExpensesFactory.createOne();

      await Expense.create(expense);

      await request(app).delete(`/expenses/${expense._id}`).expect(200);
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Expense not found", async () => {
      const expense = mockExpensesFactory.createOne();

      const response = await request(app)
        .delete(`/expenses/${expense._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Expense not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .delete(`/expenses/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
