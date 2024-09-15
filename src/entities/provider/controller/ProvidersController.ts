import { NextFunction, Response } from "express";
import Controller from "../../../controller/Controller.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity.js";
import {
  ProvidersControllerStructure,
  RequestWithStartQueryParam,
} from "./types";
import { minDebounceAllowedLength } from "../../../const.js";
import ServerError from "../../../server/errors/ServerError/ServerError.js";
import ProvidersRepository from "../repository/ProvidersRepository.js";

class ProvidersController
  extends Controller<ProviderEntity, ProviderEntityData>
  implements ProvidersControllerStructure
{
  constructor(
    protected repository: ProvidersRepository,
    entityData: {
      singular: string;
      plural: string;
    },
  ) {
    super(repository, entityData);
  }

  getByStart = async (
    req: RequestWithStartQueryParam,
    res: Response,
    next: NextFunction,
  ) => {
    const { start } = req.params;

    if (start.length < minDebounceAllowedLength) {
      const error = new ServerError(
        `Search string must be ${minDebounceAllowedLength} chars long at least`,
        400,
      );

      next(error);
      return;
    }

    const providers = await this.repository.getByStart(start);

    res.status(200).json({ providers });
  };
}

export default ProvidersController;
