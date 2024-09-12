import { Model, Types } from "mongoose";
import { RepositoryStructure } from "./types";

class Repository<Entity extends { _id: Types.ObjectId }, EntityData>
  implements RepositoryStructure<Entity, EntityData>
{
  constructor(
    private model: Model<Entity>,
    private entityName: string,
  ) {}

  async get(): Promise<Entity[]> {
    const items = await this.model.find().exec();

    return items;
  }

  async getById(id: Entity["_id"]): Promise<Entity> {
    const item = await this.model.findById(id);

    if (!item) {
      throw new Error(`${this.entityName} not found`);
    }

    return item;
  }

  async add(data: EntityData): Promise<Entity> {
    const newItem = await this.model.create(data);

    return newItem;
  }

  async updateById(entity: Entity): Promise<Entity> {
    const updatedItem = await this.model.findByIdAndUpdate(entity._id, entity, {
      new: true,
    });

    if (!updatedItem) {
      throw new Error(`${this.entityName} not found`);
    }

    return updatedItem;
  }

  async deleteById(id: Entity["_id"]): Promise<void> {
    const deletedItem = await this.model.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new Error(`${this.entityName} not found`);
    }
  }
}

export default Repository;
