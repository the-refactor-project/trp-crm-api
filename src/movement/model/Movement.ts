import { model, Schema } from "mongoose";
import MovementEntity from "../MovementEntity.js";

const movementSchema = new Schema<MovementEntity>({
  type: {
    enum: ["in", "out"],
    required: true,
  },
  currency: {
    enum: ["EUR", "USD"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Movement = model("Movement", movementSchema, "movements");

export default Movement;
