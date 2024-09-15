import { Router } from "express";
import Movement from "../model/Movement.js";
import MovementsRepository from "../repository/MovementsRepository.js";
import MovementsController from "../controller/MovementsController.js";

const movementsRouter = Router();

const movementsRepository = new MovementsRepository(Movement, "Movement");
const movementsController = new MovementsController(movementsRepository, {
  singular: "Movement",
  plural: "Movements",
});

movementsRouter.get("/", movementsController.get);
movementsRouter.get("/search/:search", movementsController.search);
movementsRouter.get("/:id", movementsController.getById);
movementsRouter.post("/", movementsController.add);
movementsRouter.put("/", movementsController.updateById);
movementsRouter.delete("/:id", movementsController.deleteById);

export default movementsRouter;
