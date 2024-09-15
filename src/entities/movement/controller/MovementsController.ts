import { NextFunction, Response } from "express";
import Controller from "../../../controller/Controller.js";
import { minDebounceAllowedLength } from "../../../const.js";
import ServerError from "../../../server/errors/ServerError/ServerError.js";
import { ControllerWithSearch } from "../../../controller/types.js";
import { MovementEntity, MovementEntityData } from "../MovementEntity.js";
import MovementsRepository from "../repository/MovementsRepository.js";
import { RequestWithSearchParam } from "../../provider/controller/types.js";

class MovementsController
  extends Controller<MovementEntity, MovementEntityData>
  implements ControllerWithSearch
{
  constructor(
    protected repository: MovementsRepository,
    entityData: {
      singular: string;
      plural: string;
    },
  ) {
    super(repository, entityData);
  }

  search = async (
    req: RequestWithSearchParam,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { search } = req.params;

    if (search.length < minDebounceAllowedLength) {
      const error = new ServerError(
        `Search string must be ${minDebounceAllowedLength} chars long at least`,
        400,
      );

      next(error);
      return;
    }

    const movements = await this.repository.search(search);

    res.status(200).json({ movements });
  };
}

export default MovementsController;
