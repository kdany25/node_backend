import mongoose from "mongoose";

const RoadSchema = new mongoose.Schema(
  {
    place: { type: String, required: true },
    kmreached: {type: Number, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roads", RoadSchema);
