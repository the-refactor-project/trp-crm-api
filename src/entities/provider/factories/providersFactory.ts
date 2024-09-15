import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { currencies } from "../../../const.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity";
import Nif from "../../../Nif/Nif.js";
import { MockItemsFactory } from "../../../factories/index.js";

export const providersFactory = Factory.define<ProviderEntity>(() => ({
  _id: new Types.ObjectId(),
  name: faker.company.name(),
  commercialName: faker.company.name(),
  nif: new Nif().getNumber(),
  vat: "ES" + new Nif().getNumber(),
  currency: faker.helpers.arrayElement(currencies),
  phoneNumber: faker.phone.number(),
  address: {
    city: faker.location.city(),
    locality: faker.location.county(),
    address: faker.location.streetAddress(),
    country: faker.location.country(),
    zip: faker.location.zipCode(),
  },
}));

export const mockProvidersFactory = new MockItemsFactory<
  ProviderEntity,
  ProviderEntityData
>(providersFactory);
