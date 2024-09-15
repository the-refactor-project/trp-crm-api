import { Types } from "mongoose";

export class LeadEventEntityData {
  date: Date;
  description: string;
}

export class LeadEventEntity extends LeadEventEntityData {
  _id: Types.ObjectId;
}
