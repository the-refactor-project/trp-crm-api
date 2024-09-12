import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { currencies } from "../../../const.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";
import { Types } from "mongoose";
import Nif from "../../../Nif/Nif.js";

const providersFactory = Factory.define<ProviderEntity>(() => ({
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

export const createMockProviders = (number = 2): ProviderEntity[] =>
  createMockItems<ProviderEntity>(providersFactory, number);

export const createMockProviderDatas = (number = 2): ProviderEntityData[] =>
  createMockItemDatas<ProviderEntity, ProviderEntityData>(
    providersFactory,
    number,
  );
