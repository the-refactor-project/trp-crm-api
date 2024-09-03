import {
  MovementCategoryEntity,
  MovementCategoryEntityData,
} from "../MovementCategoryEntity";

export interface MovementCategoriesRepositoryStructure {
  getMovementCategories: () => Promise<MovementCategoryEntity[]>;
  getMovementCategoryById: (
    movementCategoryId: MovementCategoryEntity["_id"],
  ) => Promise<MovementCategoryEntity>;
  addMovementCategory: (
    movementCategoryData: MovementCategoryEntityData,
  ) => Promise<MovementCategoryEntity>;
  updateMovementCategoryById: (
    movementCategory: MovementCategoryEntity,
  ) => Promise<MovementCategoryEntity>;
  deleteMovementCategoryById: (
    movementCategoryId: MovementCategoryEntity["_id"],
  ) => Promise<void>;
}
