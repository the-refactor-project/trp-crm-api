import { Schema } from "mongoose";
import { AddressEntity } from "../AddressEntity";

export const addressSchema = new Schema<AddressEntity>({
  address: String,
  city: String,
  locality: String,
  country: String,
  zip: String,
});
