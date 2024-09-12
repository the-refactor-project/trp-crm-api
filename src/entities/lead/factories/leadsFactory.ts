import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { LeadEntity, LeadEntityData } from "../LeadEntity";
import { createMockItemDatas, createMockItems } from "../../../factories";
import { Types } from "mongoose";
import Nif from "../../../Nif/Nif";

const leadsFactory = Factory.define<LeadEntity>(() => ({
  _id: new Types.ObjectId(),
  name: faker.person.firstName(),
  lastName: faker.person.lastName(),
  nif: new Nif().getNumber(),
  address: {
    city: faker.location.city(),
    locality: faker.location.county(),
    address: faker.location.streetAddress(),
    country: faker.location.country(),
    zip: faker.location.zipCode(),
  },
  entryDate: faker.date.recent(),
  askedFor: faker.lorem.word(),
  channel: faker.lorem.word(),
  email: faker.internet.email(),
  formComments: faker.lorem.sentence(),
  origin: faker.lorem.word(),
  phoneNumber: faker.phone.number(),
  referralOf: faker.person.firstName(),
}));

export const createMockLeads = (number = 2): LeadEntity[] =>
  createMockItems<LeadEntity>(leadsFactory, number);

export const createMockLeadDatas = (number = 2): LeadEntityData[] =>
  createMockItemDatas<LeadEntity, LeadEntityData>(leadsFactory, number);
