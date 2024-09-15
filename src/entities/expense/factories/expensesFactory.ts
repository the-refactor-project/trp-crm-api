import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { ExpenseEntity, ExpenseEntityData } from "../ExpenseEntity";
import { currencies } from "../../../const.js";
import { MockItemsFactory } from "../../../factories";

const expensesFactory = Factory.define<ExpenseEntity>(() => ({
  _id: new Types.ObjectId(),
  currency: faker.helpers.arrayElement(currencies),
  date: faker.date.recent(),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  isCard: faker.datatype.boolean(),
  providerId: new Types.ObjectId(),
}));

export const mockExpensesFactory = new MockItemsFactory<
  ExpenseEntity,
  ExpenseEntityData
>(expensesFactory);
