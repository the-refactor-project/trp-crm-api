import { Currency } from "../../types";

export class MovementEntityData {
  type: "in" | "out";
  description: string;
  currency: Currency;
  isCard: boolean;
  quantity: number;
  date: Date;
}

export class MovementEntity extends MovementEntityData {
  _id: string;
}
