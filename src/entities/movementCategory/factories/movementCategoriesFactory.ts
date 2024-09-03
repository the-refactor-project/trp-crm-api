import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";

const movementCategoriesFactory = Factory.define<MovementCategoryEntity>(
  () => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.lorem.words(2),
  }),
);

export const createMockMovementCategories = (
  number = 2,
): MovementCategoryEntity[] => movementCategoriesFactory.buildList(number);

export const createMockMovementCategoryDatas = (
  number = 2,
): MovementCategoryEntityData[] =>
  createMockMovementCategories(number).map<MovementCategoryEntityData>(
    (movementCategory) => {
      const newMovementCategoryData: MovementCategoryEntityData = {
        ...movementCategory,
      };

      delete (newMovementCategoryData as Partial<MovementCategoryEntity>)._id;

      return newMovementCategoryData;
    },
  );
