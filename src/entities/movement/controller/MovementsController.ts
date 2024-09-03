import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { MovementsControllerStructure } from "./types";
import { MovementsRepositoryStructure } from "../repository/types";
import { MovementEntity, MovementEntityData } from "../MovementEntity";
import ServerError from "../../../server/errors/ServerError/ServerError.js";

class MovementsController implements MovementsControllerStructure {
  constructor(private movementsRepository: MovementsRepositoryStructure) {}

  getMovements = async (_req: Request, res: Response): Promise<void> => {
    const movements = await this.movementsRepository.getMovements();

    res.status(200).json({ movements });
  };

  getMovementById = async (
    req: Request<{ movementId: MovementEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movementId } = req.params;

      const movement =
        await this.movementsRepository.getMovementById(movementId);

      res.status(200).json({ movement });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Movement not found") {
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

  addMovement = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementEntityData
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const newMovementData = req.body;

    try {
      const movement =
        await this.movementsRepository.addMovement(newMovementData);

      res.status(201).json({ movement });
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

  updateMovementById = async (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementEntity
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const movement = req.body;

      const updatedMovement =
        await this.movementsRepository.updateMovementById(movement);

      res.status(200).json({ movement: updatedMovement });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Movement not found") {
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

  deleteMovementById = async (
    req: Request<{ movementId: MovementEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { movementId } = req.params;

      await this.movementsRepository.deleteMovementById(movementId);

      res.status(200).json({ deleted: true });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === "Movement not found") {
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
}

export default MovementsController;
