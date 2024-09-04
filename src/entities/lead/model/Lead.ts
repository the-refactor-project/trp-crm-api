import { model, Schema } from "mongoose";
import { LeadEntity } from "../LeadEntity.js";

const leadSchema = new Schema<LeadEntity>({
  name: {
    type: String,
    required: true,
  },
  lastName: String,
  nif: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  address: {
    address: String,
    city: String,
    locality: String,
    country: String,
    zip: String,
  },
  channel: String,
  origin: String,
  referralOf: String,
  enterDate: {
    type: Date,
    default: new Date(),
  },
  askedFor: String,
  formComments: String,
});

const Lead = model("Lead", leadSchema, "leads");

export default Lead;
