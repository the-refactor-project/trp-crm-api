import { Model } from "mongoose";
import { MovementEntity, MovementEntityData } from "../MovementEntity";
import { MovementsRepositoryStructure } from "./types";

class MovementsRepository implements MovementsRepositoryStructure {
  constructor(private movement: Model<MovementEntity>) {}

  async getMovements(): Promise<MovementEntity[]> {
    const movements = await this.movement.find().exec();

    return movements;
  }

  async addMovement(movementData: MovementEntityData): Promise<MovementEntity> {
    const newMovement = await this.movement.create(movementData);

    return newMovement;
  }
}

export default MovementsRepository;
