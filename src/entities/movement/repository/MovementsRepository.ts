import Repository from "../../../repository/Repository.js";
import { RepositoryWithSearch } from "../../../repository/types.js";
import { MovementEntity, MovementEntityData } from "../MovementEntity.js";

class MovementsRepository
  extends Repository<MovementEntity, MovementEntityData>
  implements RepositoryWithSearch<MovementEntity>
{
  async search(search: string): Promise<MovementEntity[]> {
    const items = await this.model
      .find({
        description: {
          $regex: search,
          $options: "i",
        },
      })
      .exec();

    return items;
  }
}

export default MovementsRepository;
