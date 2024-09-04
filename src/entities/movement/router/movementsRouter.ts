import { Router } from "express";
import Movement from "../model/Movement.js";
import Repository from "../../../repository/Repository.js";
import { MovementEntity, MovementEntityData } from "../MovementEntity.js";
import Controller from "../../../controller/Controller.js";

const movementsRouter = Router();

const movementsRepository = new Repository<MovementEntity, MovementEntityData>(
  Movement,
  "Movement",
);
const movementsController = new Controller<MovementEntity, MovementEntityData>(
  movementsRepository,
  {
    singular: "Movement",
    plural: "Movements",
  },
);

movementsRouter.get("/", movementsController.get);
movementsRouter.get("/:id", movementsController.getById);
movementsRouter.post("/", movementsController.add);
movementsRouter.put("/", movementsController.updateById);
movementsRouter.delete("/:id", movementsController.deleteById);

export default movementsRouter;
