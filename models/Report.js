import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    cost: { type: String, required: true },

    complited: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
