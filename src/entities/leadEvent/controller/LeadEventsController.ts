import { Response } from "express";
import Controller from "../../../controller/Controller.js";
import { LeadEventEntity, LeadEventEntityData } from "../LeadEventEntity";
import { LeadEventsControllerStructure, RequestWithLeadIdParam } from "./types";
import LeadEventsRepository from "../repository/LeadEventsRepository.js";
import { EntityNames } from "../../../controller/types.js";

class LeadEventsController
  extends Controller<LeadEventEntity, LeadEventEntityData>
  implements LeadEventsControllerStructure
{
  constructor(
    protected repository: LeadEventsRepository,
    entityNames: EntityNames,
  ) {
    super(repository, entityNames);
  }

  getByLeadId = async (
    req: RequestWithLeadIdParam,
    res: Response,
  ): Promise<void> => {
    const { leadId } = req.params;

    const leadEvents = await this.repository.getByLeadId(leadId, {}, "date");

    res.status(200).json({ leadEvents });
  };
}

export default LeadEventsController;
