import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { MovementsControllerStructure } from "./types";
import { MovementsRepositoryStructure } from "../repository/types";
import { MovementEntityData } from "../MovementEntity";
import ServerError from "../../server/errors/ServerError/ServerError.js";

class MovementsController implements MovementsControllerStructure {
  constructor(private movementsRepository: MovementsRepositoryStructure) {}

  getMovements = async (_req: Request, res: Response): Promise<void> => {
    const movements = await this.movementsRepository.getMovements();

    res.status(200).json({ movements });
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
}

export default MovementsController;
