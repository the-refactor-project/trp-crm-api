import { Request, Response } from "express";

const healthCheckController = (_req: Request, res: Response): void => {
  res.status(200).json({ ok: true });
};

export default healthCheckController;
