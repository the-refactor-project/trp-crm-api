import Repository from "../../../repository/Repository.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity.js";
import { ProvidersRepositoryStructure } from "./types";

class ProvidersRepository
  extends Repository<ProviderEntity, ProviderEntityData>
  implements ProvidersRepositoryStructure
{
  async search(search: string): Promise<ProviderEntity[]> {
    const items = await this.model
      .find({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            commercialName: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      })
      .exec();

    return items;
  }
}

export default ProvidersRepository;
