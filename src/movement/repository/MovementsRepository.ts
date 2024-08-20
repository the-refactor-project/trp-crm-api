import { Model } from "mongoose";
import MovementEntity from "../MovementEntity";
import { MovementsRepositoryStructure } from "./types";

class MovementsRepository implements MovementsRepositoryStructure {
  constructor(private movement: Model<MovementEntity>) {}

  async getMovements(): Promise<MovementEntity[]> {
    const movements = await this.movement.find().exec();

    return movements;
  }
}

export default MovementsRepository;
