import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ControllerStructure, EntityNames } from "./types";
import { RepositoryStructure } from "../repository/types";
import ServerError from "../server/errors/ServerError/ServerError.js";
import { WithMongoId } from "../types";

class Controller<Entity extends WithMongoId, EntityData>
  implements ControllerStructure<Entity, EntityData>
{
  constructor(
    protected repository: RepositoryStructure<Entity, EntityData>,
    private entityNames: EntityNames,
  ) {}

  get = async (_req: Request, res: Response): Promise<void> => {
    const items = await this.repository.get();

    res.status(200).json({ [this.normalize(this.entityNames.plural)]: items });
  };

  getById = async (
    req: Request<{ id: Entity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const item = await this.repository.getById(id);

      res
        .status(200)
        .json({ [this.normalize(this.entityNames.singular)]: item });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === `${this.entityNames.singular} not found`) {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          `Error deleting the ${this.entityNames.singular}`,
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  add = async (
    req: Request<Record<string, unknown>, Record<string, unknown>, EntityData>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const newItemData = req.body;

    try {
      const item = await this.repository.add(newItemData);

      res
        .status(201)
        .json({ [this.normalize(this.entityNames.singular)]: item });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.ValidationError) {
        serverError = new ServerError(
          "Missing or wrong data",
          400,
          error.message,
        );
      } else {
        serverError = new ServerError(
          `Error creating the ${this.entityNames.singular}`,
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  updateById = async (
    req: Request<Record<string, unknown>, Record<string, unknown>, Entity>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const item = req.body;

      const updatedItem = await this.repository.updateById(item);

      res.status(200).json({
        [`updated${this.normalize(this.entityNames.singular, false)}`]:
          updatedItem,
      });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === `${this.entityNames.singular} not found`) {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          `Error deleting the ${this.entityNames.singular}`,
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  deleteById = async (
    req: Request<{ id: Entity["_id"] }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await this.repository.deleteById(id);

      res.status(200).json({ deleted: true });
    } catch (error) {
      let serverError: ServerError;

      if (error instanceof Error.CastError) {
        serverError = new ServerError("Invalid id", 400, error.message);
      } else if (error.message === `${this.entityNames.singular} not found`) {
        serverError = new ServerError(error.message, 404, error.message);
      } else {
        serverError = new ServerError(
          `Error deleting the ${this.entityNames.singular}`,
          500,
          error.message,
        );
      }

      next(serverError);
    }
  };

  private normalize(text: string, toLowerCase = true): string {
    const textWords = text.split(" ");

    if (toLowerCase) {
      textWords[0] = textWords[0].toLowerCase();
    }

    return textWords.join("");
  }
}

export default Controller;
