import { model, Schema } from "mongoose";
import { CourseEntity } from "../CourseEntity.js";

const courseSchema = new Schema<CourseEntity>({
  name: {
    type: String,
    required: true,
  },
});

const Course = model("Course", courseSchema, "courses");

export default Course;
