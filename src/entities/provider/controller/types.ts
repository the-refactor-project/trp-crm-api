import { NextFunction, Request, Response } from "express";

export type RequestWithSearchParam = Request<{ search: string }>;

export interface ProvidersControllerStructure {
  search: (
    req: RequestWithSearchParam,
    res: Response,
    next: NextFunction,
  ) => void;
}
