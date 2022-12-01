import { Schema, model } from "mongoose";
import ColorEntity from "../entities/ColorEntity";

//Allow to manage the mongo db connection
const ColorScheme = new Schema<ColorEntity>(
  {
    color: { type: String, required: true, unique: true },
  },
  { versionKey: false }
);

export default model("Color", ColorScheme, "Color");
