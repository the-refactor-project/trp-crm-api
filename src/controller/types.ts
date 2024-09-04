import { NextFunction, Request, Response } from "express";

export interface ControllerStructure<
  Entity extends { _id: string },
  EntityData,
> {
  get: (req: Request, res: Response) => Promise<void>;
  getById: (
    req: Request<{ id: Entity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  add: (
    req: Request<Record<string, unknown>, Record<string, unknown>, EntityData>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  updateById: (
    req: Request<{ id: Entity["_id"] }, Record<string, unknown>, Entity>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
  deleteById: (
    req: Request<{ id: Entity["_id"] }>,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
