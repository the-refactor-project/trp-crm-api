import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import {
  CourseEditionEntity,
  CourseEditionEntityData,
} from "../CourseEditionEntity";
import { MockItemsFactory } from "../../../factories";

const courseEditionsFactory = Factory.define<CourseEditionEntity>(() => ({
  _id: new Types.ObjectId(),
  name: faker.lorem.words(1),
  date: faker.date.recent(),
}));

export const mockCourseEditionsFactory = new MockItemsFactory<
  CourseEditionEntity,
  CourseEditionEntityData
>(courseEditionsFactory);
