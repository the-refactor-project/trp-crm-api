import { NextFunction, Request, Response } from "express";
import chalk from "chalk";
import ServerError from "../ServerError/ServerError.js";

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ServerError("Endpoint not found", 404);

  next(error);
};

export const generalError = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  console.log(
    chalk.red(
      "Error: ",
      (error as ServerError).internalMessage ?? error.message,
    ),
  );

  const errorStatus = (error as ServerError).statusCode ?? 500;
  const errorMessage =
    error instanceof ServerError || !(error instanceof Error)
      ? error.message
      : "General server error";

  res.status(errorStatus).json({ error: errorMessage });
};
