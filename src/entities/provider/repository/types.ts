import { ProviderEntity } from "../ProviderEntity";

export interface ProvidersRepositoryStructure {
  search: (search: string) => Promise<ProviderEntity[]>;
}
