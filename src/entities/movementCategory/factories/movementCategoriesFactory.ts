import { Types } from "mongoose";
import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";
import { MockItemsFactory } from "../../../factories";

const movementCategoriesFactory = Factory.define<MovementCategoryEntity>(
  () => ({
    _id: new Types.ObjectId(),
    name: faker.lorem.words(2),
  }),
);

export const mockMovementCategoriesFactory = new MockItemsFactory<
  MovementCategoryEntity,
  MovementCategoryEntityData
>(movementCategoriesFactory);
