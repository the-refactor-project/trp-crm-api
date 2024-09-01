import { Router } from "express";
import MovementsController from "../controller/MovementsController.js";
import MovementsRepository from "../repository/MovementsRepository.js";
import Movement from "../model/Movement.js";

const movementsRouter = Router();

const movementsRepository = new MovementsRepository(Movement);
const movementsController = new MovementsController(movementsRepository);

movementsRouter.get("/", movementsController.getMovements);
movementsRouter.post("/", movementsController.addMovement);

export default movementsRouter;
