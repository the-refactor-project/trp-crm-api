import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { CourseEntity, CourseEntityData } from "../CourseEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";

const coursesFactory = Factory.define<CourseEntity>(() => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.lorem.slug(),
}));

export const createMockCourses = (number = 2): CourseEntity[] =>
  createMockItems<CourseEntity>(coursesFactory, number);

export const createMockCourseDatas = (number = 2): CourseEntityData[] =>
  createMockItemDatas<CourseEntity, CourseEntityData>(coursesFactory, number);
