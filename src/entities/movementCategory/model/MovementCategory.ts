import { model, Schema } from "mongoose";
import { MovementCategoryEntity } from "../MovementCategoryEntity.js";

const movementCategorySchema = new Schema<MovementCategoryEntity>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const MovementCategory = model(
  "MovementCategory",
  movementCategorySchema,
  "movements-categories",
);

export default MovementCategory;
