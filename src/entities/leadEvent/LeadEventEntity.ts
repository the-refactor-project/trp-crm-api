import { Types } from "mongoose";
import { LeadEntity } from "../lead/LeadEntity";

export class LeadEventEntityData {
  date: Date;
  description: string;
  leadId: LeadEntity["_id"];
}

export class LeadEventEntity extends LeadEventEntityData {
  _id: Types.ObjectId;
}
