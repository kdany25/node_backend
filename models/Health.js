import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema(
  {
    patient: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age : { type: String, required: true,},
    desease: { type: String, required: true,},
    address : { type: String, required: true,},
    hospital: { type: String, required: true,},
    hospitalised: {
      type: String,
      enum: ["TRUE", "FALSE"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Health", HealthSchema );
