import { Router } from "express";
import MovementCategory from "../model/MovementCategory.js";
import Repository from "../../../repository/Repository.js";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity.js";
import Controller from "../../../controller/Controller.js";

const movementsCategoriesRouter = Router();

const movementsCategoriesRepository = new Repository<
  MovementCategoryEntity,
  MovementCategoryEntityData
>(MovementCategory, "Category");
const movementCategoriesController = new Controller<
  MovementCategoryEntity,
  MovementCategoryEntityData
>(movementsCategoriesRepository, {
  singular: "Category",
  plural: "Categories",
});

movementsCategoriesRouter.get("/", movementCategoriesController.get);
movementsCategoriesRouter.get("/:id", movementCategoriesController.getById);
movementsCategoriesRouter.post("/", movementCategoriesController.add);
movementsCategoriesRouter.put("/", movementCategoriesController.updateById);
movementsCategoriesRouter.delete(
  "/:id",
  movementCategoriesController.deleteById,
);

export default movementsCategoriesRouter;
