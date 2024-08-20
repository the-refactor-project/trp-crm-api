import { Request, Response } from "express";

export interface MovementsControllerStructure {
  getMovements: (req: Request, res: Response) => Promise<void>;
}
