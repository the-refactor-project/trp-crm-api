import { Types } from "mongoose";
import { ExpenseEntity } from "../ExpenseEntity";

class ExpenseDto {
  description: string;
  currency: string;
  quantity: number;
  isCard: boolean;
  date: string;
  providerId: Types.ObjectId;
  movementId?: Types.ObjectId;

  constructor(expense: ExpenseEntity) {
    this.description = expense.description;
    this.currency = expense.currency;
    this.quantity = expense.quantity;
    this.isCard = expense.isCard;
    this.date = expense.date.toISOString();
    this.providerId = expense.providerId;
    this.movementId = expense.movementId;
  }
}

export default ExpenseDto;
