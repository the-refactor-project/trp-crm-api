import MovimentEntity from "../MovementEntity";

export interface MovementsRepositoryStructure {
  getMovements: () => Promise<MovimentEntity[]>;
}
