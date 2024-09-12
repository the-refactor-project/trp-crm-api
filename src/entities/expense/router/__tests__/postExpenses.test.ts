import request from "supertest";
import app from "../../../../server/app";
import { createMockExpenseDatas } from "../../factories/expensesFactory";
import { ExpenseEntity, ExpenseEntityData } from "../../ExpenseEntity";
import ExpenseDto from "../../dto/expenseDto";

describe("Given a POST /expenses endpoint", () => {
  describe("When it receives a request with a new expense's data", () => {
    test("Then it should respond with 201 and the new expense", async () => {
      const newExpenseData = createMockExpenseDatas(1)[0];

      const response = await request(app)
        .post("/expenses")
        .send(newExpenseData)
        .expect(201);

      const responseBody: {
        expense: ExpenseEntity;
      } = response.body;

      const expenseDto = new ExpenseDto(newExpenseData as ExpenseEntity);

      expect(responseBody.expense).toEqual(
        expect.objectContaining({
          quantity: expenseDto.quantity,
          currency: expenseDto.currency,
          date: expenseDto.date,
        }),
      );
    });
  });

  describe("When it receives a request with a new expense's data without date and quantity", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newExpenseData = createMockExpenseDatas(1)[0];

      const wrongNewExpenseData: Partial<ExpenseEntityData> = {
        ...newExpenseData,
      };

      delete wrongNewExpenseData.date;
      delete wrongNewExpenseData.quantity;

      const response = await request(app)
        .post("/expenses")
        .send(wrongNewExpenseData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
