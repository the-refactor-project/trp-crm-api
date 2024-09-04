import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { MovementEntity, MovementEntityData } from "../MovementEntity";
import { currencies } from "../../../types";
import { createMockItemDatas, createMockItems } from "../../../factories";

const movementsFactory = Factory.define<MovementEntity>(() => ({
  _id: faker.database.mongodbObjectId(),
  currency: faker.helpers.arrayElement(currencies),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  type: faker.helpers.arrayElement(["in", "out"]),
  isCard: faker.datatype.boolean(),
  date: faker.date.recent(),
}));

export const createMockMovements = (number = 2): MovementEntity[] =>
  createMockItems<MovementEntity>(movementsFactory, number);

export const createMockMovementDatas = (number = 2): MovementEntityData[] =>
  createMockItemDatas<MovementEntity, MovementEntityData>(
    movementsFactory,
    number,
  );
