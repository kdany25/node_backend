import mongoose from "mongoose";

const HealthPlanSchema = new mongoose.Schema(
  {
    
    location: { type: Number, required: true },
    number: { type: Number, required: true },
    desease: { type: String, required: true,},
    period : { type: String, required: true,},
    doctor : { type: String, required: true,},
    cost : { type: String, required: true,},
    },
  
  { timestamps: true }
);

module.exports = mongoose.model("HealthPlan", HealthPlanSchema );
