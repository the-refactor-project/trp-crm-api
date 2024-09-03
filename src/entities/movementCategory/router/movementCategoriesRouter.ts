import { Router } from "express";
import MovementCategory from "../model/MovementCategory";
import MovementCategoriesController from "../controller/MovementCategoriesController";
import MovementCategoriesRepository from "../repository/MovementCategoriesRepository";

const movementsCategoriesRouter = Router();

const movementsCategoriesRepository = new MovementCategoriesRepository(
  MovementCategory,
);
const movementCategoriesController = new MovementCategoriesController(
  movementsCategoriesRepository,
);

movementsCategoriesRouter.get(
  "/",
  movementCategoriesController.getMovementCategories,
);
movementsCategoriesRouter.get(
  "/:movementCategoryId",
  movementCategoriesController.getMovementCategoryById,
);
movementsCategoriesRouter.post(
  "/",
  movementCategoriesController.addMovementCategory,
);
movementsCategoriesRouter.put(
  "/",
  movementCategoriesController.updateMovementCategoryById,
);
movementsCategoriesRouter.delete(
  "/:movementCategoryId",
  movementCategoriesController.deleteMovementCategoryById,
);

export default movementsCategoriesRouter;
