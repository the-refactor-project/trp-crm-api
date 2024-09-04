import { Router } from "express";
import Course from "../model/Course.js";
import Repository from "../../../repository/Repository.js";
import { CourseEntity, CourseEntityData } from "../CourseEntity.js";
import Controller from "../../../controller/Controller.js";

const coursesRouter = Router();

const coursesRepository = new Repository<CourseEntity, CourseEntityData>(
  Course,
  "Course",
);
const coursesController = new Controller<CourseEntity, CourseEntityData>(
  coursesRepository,
  {
    singular: "Course",
    plural: "Courses",
  },
);

coursesRouter.get("/", coursesController.get);
coursesRouter.get("/:id", coursesController.getById);
coursesRouter.post("/", coursesController.add);
coursesRouter.put("/", coursesController.updateById);
coursesRouter.delete("/:id", coursesController.deleteById);

export default coursesRouter;
