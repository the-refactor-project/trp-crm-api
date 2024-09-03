import { NextFunction, Request, Response } from "express";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";

export interface MovementCategoriesControllerStructure {
  getMovementCategories: (req: Request, res: Response) => Promise<void>;
  getMovementCategoryById: (
    req: Request<{ movementCategoryId: MovementCategoryEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  addMovementCategory: (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementCategoryEntityData
    >,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  updateMovementCategoryById: (
    req: Request<
      { movementCategoryId: MovementCategoryEntity["_id"] },
      Record<string, unknown>,
      MovementCategoryEntity
    >,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  deleteMovementCategoryById: (
    req: Request<{ movementCategoryId: MovementCategoryEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
