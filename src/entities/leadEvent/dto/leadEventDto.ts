import { LeadEventEntity } from "../LeadEventEntity";

class LeadEventDto {
  description: string;
  date: string;

  constructor(leadEvent: LeadEventEntity) {
    this.description = leadEvent.description;
    this.date = leadEvent.date.toISOString();
  }
}

export default LeadEventDto;
