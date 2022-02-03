
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    target: { type: Number, required: true },
    sector: { type: String, required: true },
    achieved: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);