import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import {
  CourseEditionEntity,
  CourseEditionEntityData,
} from "../CourseEditionEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";

const courseEditionsFactory = Factory.define<CourseEditionEntity>(() => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.lorem.words(1),
  date: faker.date.recent(),
}));

export const createMockCourseEditions = (number = 2): CourseEditionEntity[] =>
  createMockItems<CourseEditionEntity>(courseEditionsFactory, number);

export const createMockCourseEditionsDatas = (
  number = 2,
): CourseEditionEntityData[] =>
  createMockItemDatas<CourseEditionEntity, CourseEditionEntityData>(
    courseEditionsFactory,
    number,
  );
