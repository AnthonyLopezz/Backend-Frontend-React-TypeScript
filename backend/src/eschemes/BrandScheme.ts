import { Schema, model } from "mongoose";
import BrandEntity from "../entities/BrandEntity";

//Allow to manage the mongo db connection
const BrandScheme = new Schema<BrandEntity>(
  {
    brand: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

export default model("Brand", BrandScheme, "Brand");
