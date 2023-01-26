import mongoose from "mongoose";

const RoadPlanSchema = new mongoose.Schema(
	{
		location: { type: String, required: true },
		kmreached: { type: Number, required: true },
		desc: { type: String, required: true },
		period: { type: String, required: true },
		engineer: { type: String, required: true },
		cost: { type: String, required: true },
		priority: { type: Number, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("RoadsPlan", RoadPlanSchema);
