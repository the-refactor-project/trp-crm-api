import { ProviderEntity } from "../ProviderEntity";

export interface ProvidersRepositoryStructure {
  getByStart: (startText: string) => Promise<ProviderEntity[]>;
}
