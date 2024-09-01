import { Request, Response } from "express";
import { MovementsControllerStructure } from "./types";
import { MovementsRepositoryStructure } from "../repository/types";
import { MovementEntityData } from "../MovementEntity";

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
    res: Response
  ): Promise<void> => {
    const newMovementData = req.body;

    const movement = await this.movementsRepository.addMovement(
      newMovementData
    );

    res.status(201).json({ movement });
  };
}

export default MovementsController;
