import { FilterQuery, SortOrder } from "mongoose";
import Repository from "../../../repository/Repository.js";
import { LeadEventEntity, LeadEventEntityData } from "../LeadEventEntity";
import { LeadEventsRepositoryStructure } from "./types";

class LeadEventsRepository
  extends Repository<LeadEventEntity, LeadEventEntityData>
  implements LeadEventsRepositoryStructure
{
  async getByLeadId(
    leadId: LeadEventEntity["_id"],
    filter?: FilterQuery<LeadEventEntity>,
    sort?:
      | keyof LeadEventEntity
      | { [Key in keyof LeadEventEntity]?: SortOrder },
  ): Promise<LeadEventEntity[]> {
    const leadEvents = await this.model
      .find({
        ...filter,
        leadId,
      })
      .sort(sort ?? {})
      .exec();

    return leadEvents;
  }
}

export default LeadEventsRepository;
