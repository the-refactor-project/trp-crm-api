import { Router } from "express";
import CourseEdition from "../model/CourseEdition.js";
import Repository from "../../../repository/Repository.js";
import {
  CourseEditionEntity,
  CourseEditionEntityData,
} from "../CourseEditionEntity.js";
import Controller from "../../../controller/Controller.js";

const courseEditionsRouter = Router();

const courseEditionsRepository = new Repository<
  CourseEditionEntity,
  CourseEditionEntityData
>(CourseEdition, "Edition");
const courseEditionsController = new Controller<
  CourseEditionEntity,
  CourseEditionEntityData
>(courseEditionsRepository, {
  singular: "Edition",
  plural: "Editions",
});

courseEditionsRouter.get("/", courseEditionsController.get);
courseEditionsRouter.get("/:id", courseEditionsController.getById);
courseEditionsRouter.post("/", courseEditionsController.add);
courseEditionsRouter.put("/", courseEditionsController.updateById);
courseEditionsRouter.delete("/:id", courseEditionsController.deleteById);

export default courseEditionsRouter;
