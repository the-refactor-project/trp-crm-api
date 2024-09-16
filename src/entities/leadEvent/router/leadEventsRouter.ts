import { Router } from "express";
import LeadEvent from "../model/LeadEvent.js";
import LeadEventsRepository from "../repository/LeadEventsRepository.js";
import LeadEventsController from "../controller/LeadEventsController.js";

const leadEventsRouter = Router();

const leadEventsRepository = new LeadEventsRepository(LeadEvent, "Lead Event");
const leadEventsController = new LeadEventsController(leadEventsRepository, {
  singular: "Lead Event",
  plural: "Lead Events",
});

leadEventsRouter.get("/", leadEventsController.get);
leadEventsRouter.get("/:id", leadEventsController.getById);
leadEventsRouter.get("/lead/:leadId", leadEventsController.getByLeadId);
leadEventsRouter.post("/", leadEventsController.add);
leadEventsRouter.put("/", leadEventsController.updateById);
leadEventsRouter.delete("/:id", leadEventsController.deleteById);

export default leadEventsRouter;
