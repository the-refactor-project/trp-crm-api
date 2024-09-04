import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { MovementEntity, MovementEntityData } from "../MovementEntity";

const movementsFactory = Factory.define<MovementEntity>(() => ({
  _id: faker.database.mongodbObjectId(),
  currency: faker.helpers.arrayElement(["EUR", "USD"]),
  description: faker.finance.transactionDescription(),
  quantity: Number(faker.finance.amount()),
  type: faker.helpers.arrayElement(["in", "out"]),
  isCard: faker.datatype.boolean(),
  date: faker.date.recent(),
}));

export const createMockMovements = (number = 2): MovementEntity[] =>
  movementsFactory.buildList(number);

export const createMockMovementDatas = (number = 2): MovementEntityData[] =>
  createMockMovements(number).map<MovementEntityData>((movement) => {
    const newMovementData: MovementEntityData = { ...movement };

    delete (newMovementData as Partial<MovementEntity>)._id;

    return newMovementData;
  });
