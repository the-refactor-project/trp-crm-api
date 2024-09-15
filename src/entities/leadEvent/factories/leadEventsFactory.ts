import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { MockItemsFactory } from "../../../factories";
import { LeadEventEntity, LeadEventEntityData } from "../LeadEventEntity";

const leadEventsFactory = Factory.define<LeadEventEntity>(() => ({
  _id: new Types.ObjectId(),
  description: faker.lorem.sentence(),
  date: faker.date.recent(),
}));

export const mockLeadEventsFactory = new MockItemsFactory<
  LeadEventEntity,
  LeadEventEntityData
>(leadEventsFactory);
