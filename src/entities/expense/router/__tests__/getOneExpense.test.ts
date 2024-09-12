import request from "supertest";
import app from "../../../../server/app";
import Expense from "../../model/Expense";
import { createMockExpenses } from "../../factories/expensesFactory";
import { ExpenseEntity } from "../../ExpenseEntity";
import ExpenseDto from "../../dto/expenseDto";

afterEach(async () => {
  await Expense.deleteMany();
});

describe("Given a GET /expenses/:expenseId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the expense", async () => {
      const expense = createMockExpenses(1)[0];

      await Expense.create(expense);

      const response = await request(app)
        .get(`/expenses/${expense._id}`)
        .expect(200);

      const responseBody = response.body as {
        expense: ExpenseEntity;
      };

      const expenseDto = new ExpenseDto(expense);

      expect(responseBody.expense).toEqual(
        expect.objectContaining({
          date: expenseDto.date,
          currency: expenseDto.currency,
          quantity: expenseDto.quantity,
        }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Expense not found", async () => {
      const expense = createMockExpenses(1)[0];

      const response = await request(app)
        .get(`/expenses/${expense._id}`)
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
        .get(`/expenses/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
