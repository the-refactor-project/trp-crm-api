import { Types } from "mongoose";

export interface RepositoryStructure<
  Entity extends { _id: Types.ObjectId },
  EntityData,
> {
  get: () => Promise<Entity[]>;
  getByStart: (
    startField: keyof Entity,
    startText: string,
  ) => Promise<Entity[]>;
  getById: (id: Entity["_id"]) => Promise<Entity>;
  add: (data: EntityData) => Promise<Entity>;
  updateById: (entity: Entity) => Promise<Entity>;
  deleteById: (id: Entity["_id"]) => Promise<void>;
}
