import { model, Schema } from "mongoose";
import { ProviderEntity } from "../ProviderEntity.js";
import { currencies } from "../../../const.js";

const providerSchema = new Schema<ProviderEntity>({
  name: {
    type: String,
    required: true,
  },
  commercialName: String,
  email: String,
  nif: {
    type: String,
    required: true,
    unique: true,
  },
  vat: {
    type: String,
    unique: true,
    sparse: true,
  },
  currency: {
    type: String,
    enum: currencies,
    default: "EUR",
  },
  phoneNumber: String,
  address: {
    address: String,
    city: String,
    locality: String,
    country: String,
    zip: String,
  },
});

const Provider = model("Provider", providerSchema, "providers");

export default Provider;
