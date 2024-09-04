import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";

const movementCategoriesFactory = Factory.define<MovementCategoryEntity>(
  () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.lorem.words(2),
  }),
);

export const createMockMovementCategories = (
  number = 2,
): MovementCategoryEntity[] =>
  createMockItems<MovementCategoryEntity>(movementCategoriesFactory, number);

export const createMockMovementCategoryDatas = (
  number = 2,
): MovementCategoryEntityData[] =>
  createMockItemDatas<MovementCategoryEntity, MovementCategoryEntityData>(
    movementCategoriesFactory,
    number,
  );
