import { AddressEntity } from "../../address/AddressEntity";
import { LeadEntity } from "../LeadEntity";

class LeadDto {
  name: string;
  lastName?: string;
  nif?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressEntity;
  channel?: string;
  origin?: string;
  referralOf?: string;
  enterDate: string;
  askedFor?: string;
  formComments?: string;

  constructor(lead: LeadEntity) {
    this.name = lead.name;
    this.lastName = lead.lastName;
    this.nif = lead.nif;
    this.email = lead.email;
    this.phoneNumber = lead.phoneNumber;
    this.address = lead.address;
    this.askedFor = lead.askedFor;
    this.channel = lead.channel;
    this.formComments = lead.formComments;
    this.origin = lead.origin;
    this.referralOf = lead.referralOf;
    this.enterDate = lead.enterDate.toISOString();
  }
}

export default LeadDto;
