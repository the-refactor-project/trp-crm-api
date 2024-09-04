import { Router } from "express";
import Lead from "../model/Lead.js";
import Repository from "../../../repository/Repository.js";
import { LeadEntity, LeadEntityData } from "../LeadEntity.js";
import Controller from "../../../controller/Controller.js";

const leadsRouter = Router();

const leadsRepository = new Repository<LeadEntity, LeadEntityData>(
  Lead,
  "Lead",
);
const leadsController = new Controller<LeadEntity, LeadEntityData>(
  leadsRepository,
  {
    singular: "Lead",
    plural: "Leads",
  },
);

leadsRouter.get("/", leadsController.get);
leadsRouter.get("/:id", leadsController.getById);
leadsRouter.post("/", leadsController.add);
leadsRouter.put("/", leadsController.updateById);
leadsRouter.delete("/:id", leadsController.deleteById);

export default leadsRouter;
