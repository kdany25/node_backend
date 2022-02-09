import mongoose from "mongoose";

const HouseSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    peopleInhouse: { type: String, required: true,},
    newHouse: {
      type: String,
      enum: ["Renew", "NewHouse"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("House", HouseSchema);
