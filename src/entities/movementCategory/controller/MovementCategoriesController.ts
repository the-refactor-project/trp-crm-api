import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { MovementCategoriesControllerStructure } from "./types.js";
import { MovementCategoriesRepositoryStructure } from "../repository/types.js";
import ServerError from "../../../server/errors/ServerError/ServerError.js";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity.js";

class MovementCategoriesController
  implements MovementCategoriesControllerStructure
{
  constructor(
    private movementsCategoriesRepository: MovementCategoriesRepositoryStructure,
  ) {}

  getMovementCategories = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    const movementCategories =
      await this.movementsCategoriesRepository.getMovementCategories();

    res.status(200).json({ movementCategories });
  };

  getMovementCategoryById = async (
    req: Request<{ movementCategoryId: MovementCategoryEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movementCategoryId } = req.params;

      const movementCategory =
        await this.movementsCategoriesRepository.getMovementCategoryById(
          movementCategoryId,
        );

      res.status(200).json({ movementCategory });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Category not found") {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          "Error deleting the category",
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  addMovementCategory = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementCategoryEntityData
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const newMovementCategoryData = req.body;

    try {
      const movementCategory =
        await this.movementsCategoriesRepository.addMovementCategory(
          newMovementCategoryData,
        );

      res.status(201).json({ movementCategory });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.ValidationError) {
        serverError = new ServerError(
          "Missing or wrong data",
          400,
          error.message,
        );
      } else {
        serverError = new ServerError(
          "Error creating the movement",
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  updateMovementCategoryById = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementCategoryEntity
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const movement = req.body;

      const updatedMovementCategory =
        await this.movementsCategoriesRepository.updateMovementCategoryById(
          movement,
        );

      res.status(200).json({ movementCategory: updatedMovementCategory });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Category not found") {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          "Error deleting the movement",
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  deleteMovementCategoryById = async (
    req: Request<{ movementCategoryId: MovementCategoryEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movementCategoryId } = req.params;

      await this.movementsCategoriesRepository.deleteMovementCategoryById(
        movementCategoryId,
      );

      res.status(200).json({ deleted: true });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Category not found") {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          "Error deleting the category",
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };
}

export default MovementCategoriesController;
