import { FilterQuery, SortOrder } from "mongoose";
import { WithMongoId } from "../types";

export interface RepositoryStructure<Entity extends WithMongoId, EntityData> {
  get: (
    filter?: FilterQuery<Entity>,
    sort?: keyof Entity | { [Key in keyof Entity]?: SortOrder },
  ) => Promise<Entity[]>;
  getById: (id: Entity["_id"]) => Promise<Entity>;
  add: (data: EntityData) => Promise<Entity>;
  updateById: (entity: Entity) => Promise<Entity>;
  deleteById: (id: Entity["_id"]) => Promise<void>;
}

export interface RepositoryWithSearch<Entity> {
  search: (search: string) => Promise<Entity[]>;
}
