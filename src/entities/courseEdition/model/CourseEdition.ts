import { model, Schema } from "mongoose";
import { CourseEditionEntity } from "../CourseEditionEntity.js";

const courseEditionSchema = new Schema<CourseEditionEntity>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const CourseEdition = model(
  "CourseEdition",
  courseEditionSchema,
  "courses-editions",
);

export default CourseEdition;
