import { Schema, model, Types } from "mongoose";
import VehicleEntity from "../entities/VehicleEntity";

//Allow to manage the mongo db connection
const VehicleScheme = new Schema<VehicleEntity>(
  {
    brandId: { type: Types.ObjectId, ref: "Brand", required: true },
    colorId: {  type: Types.ObjectId, ref: "Color", required: true },
    plate: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

export default model("Vehicle", VehicleScheme, "Vehicle");
