import { model, Schema } from "mongoose";
import { MovementEntity } from "../MovementEntity.js";

const movementSchema = new Schema<MovementEntity>({
  type: {
    type: String,
    enum: ["in", "out"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    enum: ["EUR", "USD"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isCard: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Movement = model("Movement", movementSchema, "movements");

export default Movement;
