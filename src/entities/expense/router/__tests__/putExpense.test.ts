import request from "supertest";
import { Types } from "mongoose";
import app from "../../../../server/app";
import Expense from "../../model/Expense";
import { ExpenseEntity } from "../../ExpenseEntity";
import ExpenseDto from "../../dto/expenseDto";
import { mockExpensesFactory } from "../../factories/expensesFactory";

afterEach(async () => {
  await Expense.deleteMany();
});

describe("Given a PUT /expenses/:expenseId endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated expense", async () => {
      const expense = mockExpensesFactory.createOne();

      await Expense.create(expense);

      const updatedExpenseQuantity = expense.quantity + 10;

      const updatedExpense: ExpenseEntity = {
        ...expense,
        quantity: updatedExpenseQuantity,
      };

      const response = await request(app)
        .put("/expenses")
        .send(updatedExpense)
        .expect(200);

      const responseBody = response.body as {
        updatedExpense: ExpenseEntity;
      };

      const updatedExpenseDto = new ExpenseDto(updatedExpense);

      expect(responseBody.updatedExpense).toEqual(
        expect.objectContaining({
          quantity: updatedExpenseDto.quantity,
          currency: updatedExpenseDto.currency,
          date: updatedExpenseDto.date,
        }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Expense not found", async () => {
      const expense = mockExpensesFactory.createOne();

      const response = await request(app)
        .put("/expenses")
        .send(expense)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Expense not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const expense = mockExpensesFactory.createOne();

      expense._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app)
        .put("/expenses")
        .send(expense)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
