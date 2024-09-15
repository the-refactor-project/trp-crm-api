import { WithMongoId } from "../types";

export interface RepositoryStructure<Entity extends WithMongoId, EntityData> {
  get: () => Promise<Entity[]>;
  getById: (id: Entity["_id"]) => Promise<Entity>;
  add: (data: EntityData) => Promise<Entity>;
  updateById: (entity: Entity) => Promise<Entity>;
  deleteById: (id: Entity["_id"]) => Promise<void>;
}
