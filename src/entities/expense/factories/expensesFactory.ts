import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { createMockItemDatas, createMockItems } from "../../../factories";
import { ExpenseEntity, ExpenseEntityData } from "../ExpenseEntity";
import { currencies } from "../../../types";

const expensesFactory = Factory.define<ExpenseEntity>(() => ({
  _id: new Types.ObjectId(),
  currency: faker.helpers.arrayElement(currencies),
  date: faker.date.recent(),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  isCard: faker.datatype.boolean(),
  providerId: new Types.ObjectId(),
}));

export const createMockExpenses = (number = 2): ExpenseEntity[] =>
  createMockItems<ExpenseEntity>(expensesFactory, number);

export const createMockExpenseDatas = (number = 2): ExpenseEntityData[] =>
  createMockItemDatas<ExpenseEntity, ExpenseEntityData>(
    expensesFactory,
    number,
  );
