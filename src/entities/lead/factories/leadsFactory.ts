import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { LeadEntity, LeadEntityData } from "../LeadEntity";
import Nif from "../../../Nif/Nif";
import { MockItemsFactory } from "../../../factories";

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

export const mockLeadsFactory = new MockItemsFactory<
  LeadEntity,
  LeadEntityData
>(leadsFactory);
