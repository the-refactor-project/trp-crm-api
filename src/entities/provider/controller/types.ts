import { NextFunction, Request, Response } from "express";

export type RequestWithStartQueryParam = Request<{ start: string }>;

export interface ProvidersControllerStructure {
  getByStart: (
    req: RequestWithStartQueryParam,
    res: Response,
    next: NextFunction,
  ) => void;
}
