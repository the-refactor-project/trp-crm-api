import mongoose, { model, Schema } from "mongoose";
import { currencies } from "../../../const.js";
import { ExpenseEntity } from "../ExpenseEntity.js";

const expenseSchema = new Schema<ExpenseEntity>({
  description: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    enum: currencies,
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
  providerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Provider",
    required: true,
  },
  movementId: {
    type: mongoose.Schema.ObjectId,
    ref: "Movement",
  },
});

const Expense = model("Expense", expenseSchema, "expenses");

export default Expense;
