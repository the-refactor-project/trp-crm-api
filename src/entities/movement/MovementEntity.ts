export class MovementEntityData {
  type: "in" | "out";
  description: string;
  currency: "EUR" | "USD";
  isCard: boolean;
  quantity: number;
  date: Date;
}

export class MovementEntity extends MovementEntityData {
  _id: string;
}
