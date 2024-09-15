import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { MovementEntity, MovementEntityData } from "../MovementEntity";
import { currencies } from "../../../const.js";
import { MockItemsFactory } from "../../../factories";
import { Types } from "mongoose";

const movementsFactory = Factory.define<MovementEntity>(() => ({
  _id: new Types.ObjectId(),
  currency: faker.helpers.arrayElement(currencies),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  type: faker.helpers.arrayElement(["in", "out"]),
  isCard: faker.datatype.boolean(),
  date: faker.date.recent(),
}));

export const mockMovementsFactory = new MockItemsFactory<
  MovementEntity,
  MovementEntityData
>(movementsFactory);
