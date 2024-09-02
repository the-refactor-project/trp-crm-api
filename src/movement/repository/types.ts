import { MovementEntity, MovementEntityData } from "../MovementEntity";

export interface MovementsRepositoryStructure {
  getMovements: () => Promise<MovementEntity[]>;
  addMovement: (movementData: MovementEntityData) => Promise<MovementEntity>;
  deleteMovementById: (movementId: MovementEntity["_id"]) => Promise<void>;
}
