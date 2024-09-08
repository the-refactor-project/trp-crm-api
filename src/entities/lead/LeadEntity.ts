import { AddressEntity } from "../address/AddressEntity";

export class LeadEntityData {
  name: string;
  lastName?: string;
  nif?: string;
  email?: string;
  phoneNumber?: string;
  address?: AddressEntity;
  channel?: string;
  origin?: string;
  referralOf?: string;
  entryDate: Date;
  askedFor?: string;
  formComments?: string;
}

export class LeadEntity extends LeadEntityData {
  _id: string;
}
