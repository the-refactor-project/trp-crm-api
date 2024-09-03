import { Model } from "mongoose";
import { MovementEntity, MovementEntityData } from "../MovementEntity";
import { MovementsRepositoryStructure } from "./types";

class MovementsRepository implements MovementsRepositoryStructure {
  constructor(private movement: Model<MovementEntity>) {}

  async getMovements(): Promise<MovementEntity[]> {
    const movements = await this.movement.find().exec();

    return movements;
  }

  async getMovementById(
    movementId: MovementEntity["_id"],
  ): Promise<MovementEntity> {
    const movement = await this.movement.findById(movementId);

    if (!movement) {
      throw new Error("Movement not found");
    }

    return movement;
  }

  async addMovement(movementData: MovementEntityData): Promise<MovementEntity> {
    const newMovement = await this.movement.create(movementData);

    return newMovement;
  }

  async updateMovementById(movement: MovementEntity): Promise<MovementEntity> {
    const updatedMovement = await this.movement.findByIdAndUpdate(
      movement._id,
      movement,
      {
        new: true,
      },
    );

    if (!updatedMovement) {
      throw new Error("Movement not found");
    }

    return updatedMovement;
  }

  async deleteMovementById(movementId: MovementEntity["_id"]): Promise<void> {
    const deletedMovement = await this.movement.findByIdAndDelete(movementId);

    if (!deletedMovement) {
      throw new Error("Movement not found");
    }
  }
}

export default MovementsRepository;
