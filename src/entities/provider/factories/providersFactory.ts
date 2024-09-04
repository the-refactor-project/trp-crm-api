import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { currencies } from "../../../types";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";

const generateSpanishNif = (): string => {
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  const randomNumber = faker.number.int({ min: 10000000, max: 99999999 });
  const letter = letters[randomNumber % 23];
  return `${randomNumber}${letter}`;
};

const providersFactory = Factory.define<ProviderEntity>(() => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.company.name(),
  commercialName: faker.company.name(),
  nif: generateSpanishNif(),
  vat: "ES" + generateSpanishNif(),
  currency: faker.helpers.arrayElement(currencies),
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
