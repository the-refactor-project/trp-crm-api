import { Types } from "mongoose";

export class CourseEntityData {
  name: string;
}

export class CourseEntity extends CourseEntityData {
  _id: Types.ObjectId;
}
