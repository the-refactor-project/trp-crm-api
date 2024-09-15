import request from "supertest";
import app from "../../../../server/app";
import Expense from "../../model/Expense";
import { ExpenseEntity } from "../../ExpenseEntity";
import ExpenseDto from "../../dto/expenseDto";
import { mockExpensesFactory } from "../../factories/expensesFactory";

afterEach(async () => {
  await Expense.deleteMany();
});

describe("Given a GET /expenses endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two expenses", async () => {
      const expenses = mockExpensesFactory.createMany(2);

      for await (const expense of expenses) {
        await Expense.create(expense);
      }

      const response = await request(app).get("/expenses").expect(200);

      const responseBody: {
        expenses: ExpenseEntity[];
      } = response.body;

      expenses.forEach((expense, index) => {
        const expenseDto = new ExpenseDto(expense);

        expect(responseBody.expenses[index]).toEqual(
          expect.objectContaining({
            date: expenseDto.date,
            currency: expenseDto.currency,
            quantity: expenseDto.quantity,
          }),
        );
      });
    });
  });
});
