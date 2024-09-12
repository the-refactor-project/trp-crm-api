import { Types } from "mongoose";

export class CourseEditionEntityData {
  name: string;
  date: Date;
}

export class CourseEditionEntity extends CourseEditionEntityData {
  _id: Types.ObjectId;
}
