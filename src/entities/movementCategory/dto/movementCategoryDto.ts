import { MovementCategoryEntity } from "../MovementCategoryEntity";

class MovementCategoryDto {
  name: string;

  constructor(movementCategory: MovementCategoryEntity) {
    this.name = movementCategory.name;
  }
}

export default MovementCategoryDto;
