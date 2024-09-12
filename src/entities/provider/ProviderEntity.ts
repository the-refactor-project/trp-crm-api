import { Types } from "mongoose";
import { Currency } from "../../types";
import { AddressEntity } from "../address/AddressEntity";

export class ProviderEntityData {
  name: string;
  commercialName?: string;
  email?: string;
  nif: string;
  vat?: string;
  address: AddressEntity;
  currency?: Currency;
  phoneNumber: string;
}

export class ProviderEntity extends ProviderEntityData {
  _id: Types.ObjectId;
}
