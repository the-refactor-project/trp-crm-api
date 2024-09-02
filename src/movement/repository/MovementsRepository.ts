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

  async deleteMovementById(movementId: MovementEntity["_id"]): Promise<void> {
    const deletedMovement = await this.movement.findByIdAndDelete(movementId);

    if (!deletedMovement) {
      throw new Error("Movement not found");
    }
  }
}

export default MovementsRepository;
