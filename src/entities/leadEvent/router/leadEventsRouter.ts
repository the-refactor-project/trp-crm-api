import { Router } from "express";
import Repository from "../../../repository/Repository.js";
import Controller from "../../../controller/Controller.js";
import { LeadEventEntity, LeadEventEntityData } from "../LeadEventEntity.js";
import LeadEvent from "../model/LeadEvent.js";

const leadEventsRouter = Router();

const leadEventsRepository = new Repository<
  LeadEventEntity,
  LeadEventEntityData
>(LeadEvent, "Lead Event");
const leadEventsController = new Controller<
  LeadEventEntity,
  LeadEventEntityData
>(leadEventsRepository, {
  singular: "Lead Event",
  plural: "Lead Events",
});

leadEventsRouter.get("/", leadEventsController.get);
leadEventsRouter.get("/:id", leadEventsController.getById);
leadEventsRouter.post("/", leadEventsController.add);
leadEventsRouter.put("/", leadEventsController.updateById);
leadEventsRouter.delete("/:id", leadEventsController.deleteById);

export default leadEventsRouter;
