export class MovementEntityData {
  type: "in" | "out";
  description: string;
  currency: "EUR" | "USD";
  quantity: number;
  date: Date;
}

export class MovementEntity extends MovementEntityData {
  _id: string;
}
