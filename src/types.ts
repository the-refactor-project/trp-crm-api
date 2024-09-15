import { Types } from "mongoose";
import { currencies } from "./const";

export type Currency = (typeof currencies)[number];

export type WithMongoId = {
  _id: Types.ObjectId;
};
