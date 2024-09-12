import { Types } from "mongoose";
import { Currency } from "../../types";
import { ProviderEntity } from "../provider/ProviderEntity";
import { MovementEntity } from "../movement/MovementEntity";

export class ExpenseEntityData {
  description: string;
  currency: Currency;
  isCard: boolean;
  quantity: number;
  date: Date;
  providerId: ProviderEntity["_id"];
  movementId?: MovementEntity["_id"];
}

export class ExpenseEntity extends ExpenseEntityData {
  _id: Types.ObjectId;
}
