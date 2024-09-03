import { NextFunction, Request, Response } from "express";
import { MovementEntity, MovementEntityData } from "../MovementEntity";

export interface MovementsControllerStructure {
  getMovements: (req: Request, res: Response) => Promise<void>;
  getMovementById: (
    req: Request<{ movementId: MovementEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  addMovement: (
    req: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      MovementEntityData
    >,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  updateMovementById: (
    req: Request<
      { movementId: MovementEntity["_id"] },
      Record<string, unknown>,
      MovementEntity
    >,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  deleteMovementById: (
    req: Request<{ movementId: MovementEntity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
