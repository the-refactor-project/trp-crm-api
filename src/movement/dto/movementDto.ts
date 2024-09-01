import { MovementEntity } from "../MovementEntity";

class MovementDto {
  type: string;
  description: string;
  currency: string;
  quantity: number;
  date: string;

  constructor(movement: MovementEntity) {
    this.type = movement.type;
    this.description = movement.description;
    this.currency = movement.currency;
    this.quantity = movement.quantity;
    this.date = movement.date.toISOString();
  }
}

export default MovementDto;
