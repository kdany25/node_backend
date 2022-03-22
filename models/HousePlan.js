import mongoose from "mongoose";

const HousePlanSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    number: { type: String, required: true },
    period: { type: String, required: true },
    cost: { type: String, required: true },
    priority: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HousePlan", HousePlanSchema);
