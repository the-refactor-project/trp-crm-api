import Repository from "../../../repository/Repository.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity.js";
import { ProvidersRepositoryStructure } from "./types";

class ProvidersRepository
  extends Repository<ProviderEntity, ProviderEntityData>
  implements ProvidersRepositoryStructure
{
  async getByStart(startText: string): Promise<ProviderEntity[]> {
    const items = await this.model
      .find({
        $or: [
          {
            name: {
              $regex: `${startText}`,
              $options: "i",
            },
          },
          {
            commercialName: {
              $regex: `${startText}`,
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
