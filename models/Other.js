import mongoose from "mongoose";

const OtherSchema = new mongoose.Schema(
  {
    descr: { type: String, required: true },
    sector: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Other", OtherSchema);
