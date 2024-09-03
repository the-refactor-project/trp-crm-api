import { Model } from "mongoose";
import { MovementCategoriesRepositoryStructure } from "./types";
import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";

class MovementCategoriesRepository
  implements MovementCategoriesRepositoryStructure
{
  constructor(private movementCategory: Model<MovementCategoryEntity>) {}

  async getMovementCategories(): Promise<MovementCategoryEntity[]> {
    const movementCategories = await this.movementCategory.find().exec();

    return movementCategories;
  }

  async getMovementCategoryById(
    movementCategoryId: MovementCategoryEntity["_id"],
  ): Promise<MovementCategoryEntity> {
    const movementCategory =
      await this.movementCategory.findById(movementCategoryId);

    if (!movementCategory) {
      throw new Error("Category not found");
    }

    return movementCategory;
  }

  async addMovementCategory(
    movementCategoryData: MovementCategoryEntityData,
  ): Promise<MovementCategoryEntity> {
    const newMovementCategory =
      await this.movementCategory.create(movementCategoryData);

    return newMovementCategory;
  }

  async updateMovementCategoryById(
    movementCategory: MovementCategoryEntity,
  ): Promise<MovementCategoryEntity> {
    const updatedMovementCategory =
      await this.movementCategory.findByIdAndUpdate(
        movementCategory._id,
        movementCategory,
        {
          new: true,
        },
      );

    if (!updatedMovementCategory) {
      throw new Error("Category not found");
    }

    return updatedMovementCategory;
  }

  async deleteMovementCategoryById(
    movementCategoryId: MovementCategoryEntity["_id"],
  ): Promise<void> {
    const deletedMovementCategory =
      await this.movementCategory.findByIdAndDelete(movementCategoryId);

    if (!deletedMovementCategory) {
      throw new Error("Category not found");
    }
  }
}

export default MovementCategoriesRepository;
