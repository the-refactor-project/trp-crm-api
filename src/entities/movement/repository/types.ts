import { MovementEntity, MovementEntityData } from "../MovementEntity";

export interface MovementsRepositoryStructure {
  getMovements: () => Promise<MovementEntity[]>;
  getMovementById: (
    movementInd: MovementEntity["_id"],
  ) => Promise<MovementEntity>;
  addMovement: (movementData: MovementEntityData) => Promise<MovementEntity>;
  updateMovementById: (movement: MovementEntity) => Promise<MovementEntity>;
  deleteMovementById: (movementId: MovementEntity["_id"]) => Promise<void>;
}
