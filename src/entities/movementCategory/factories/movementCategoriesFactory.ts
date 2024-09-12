import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";
import { Types } from "mongoose";

const movementCategoriesFactory = Factory.define<MovementCategoryEntity>(
  () => ({
    _id: new Types.ObjectId(),
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
