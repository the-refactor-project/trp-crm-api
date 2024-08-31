class MovementEntity {
  type: "in" | "out";
  description: string;
  currency: "EUR" | "USD";
  quantity: number;
  date: Date;
}

export default MovementEntity;
