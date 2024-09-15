import { model, Schema } from "mongoose";
import { LeadEventEntity } from "../LeadEventEntity.js";

const leadEventSchema = new Schema<LeadEventEntity>({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const LeadEvent = model("LeadEvent", leadEventSchema, "lead-events");

export default LeadEvent;
