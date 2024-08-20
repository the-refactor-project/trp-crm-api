import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import MovementEntity from "../MovementEntity";

const movementsFactory = Factory.define<MovementEntity>(() => ({
  currency: faker.helpers.arrayElement(["EUR", "USD"]),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  type: faker.helpers.arrayElement(["in", "out"]),
}));

export const createMockMovements = (number = 2): MovementEntity[] =>
  movementsFactory.buildList(number);
