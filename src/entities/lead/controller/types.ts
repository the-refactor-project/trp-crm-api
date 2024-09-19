import { NextFunction, Request, Response } from "express";

export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export interface WithXlsxImport {
  importFromXlsx: (
    req: MulterRequest,
    res: Response,
    next: NextFunction,
  ) => void;
}
