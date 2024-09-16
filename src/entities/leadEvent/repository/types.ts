import { FilterQuery, SortOrder } from "mongoose";
import { LeadEventEntity } from "../LeadEventEntity";

export interface LeadEventsRepositoryStructure {
  getByLeadId(
    leadId: LeadEventEntity["_id"],
    filter?: FilterQuery<LeadEventEntity>,
    sort?:
      | keyof LeadEventEntity
      | { [Key in keyof LeadEventEntity]?: SortOrder },
  ): Promise<LeadEventEntity[]>;
}
