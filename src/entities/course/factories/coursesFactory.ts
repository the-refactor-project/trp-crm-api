import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { CourseEntity, CourseEntityData } from "../CourseEntity";
import { Types } from "mongoose";
import { MockItemsFactory } from "../../../factories";

export const coursesFactory = Factory.define<CourseEntity>(() => ({
  _id: new Types.ObjectId(),
  name: faker.lorem.slug(),
}));

export const mockCoursesFactory = new MockItemsFactory<
  CourseEntity,
  CourseEntityData
>(coursesFactory);
