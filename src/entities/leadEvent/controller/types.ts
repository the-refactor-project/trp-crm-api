import { Request, Response } from "express";
import { LeadEntity } from "../../lead/LeadEntity";

export type RequestWithLeadIdParam = Request<{ leadId: LeadEntity["_id"] }>;

export interface LeadEventsControllerStructure {
  getByLeadId: (req: RequestWithLeadIdParam, res: Response) => Promise<void>;
}
