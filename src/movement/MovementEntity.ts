class MovementEntity {
  type: "in" | "out";
  description: string;
  currency: "EUR" | "USD";
  quantity: number;
}

export default MovementEntity;
