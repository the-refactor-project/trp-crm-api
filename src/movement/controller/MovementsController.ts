import { Request, Response } from "express";
import { MovementsControllerStructure } from "./types";
import { MovementsRepositoryStructure } from "../repository/types";

class MovementsController implements MovementsControllerStructure {
  constructor(private movementsRepository: MovementsRepositoryStructure) {}

  getMovements = async (_req: Request, res: Response): Promise<void> => {
    const movements = await this.movementsRepository.getMovements();

    res.status(200).json({ movements });
  };
}

export default MovementsController;
