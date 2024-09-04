import { Currency } from "../../types";
import { AddressEntity } from "../address/AddressEntity";

export class ProviderEntityData {
  name: string;
  commercialName?: string;
  nif: string;
  vat?: string;
  address: AddressEntity;
  currency: Currency;
}

export class ProviderEntity extends ProviderEntityData {
  _id: string;
}
