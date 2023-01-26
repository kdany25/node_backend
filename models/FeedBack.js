import mongoose from "mongoose";

const FeedBackSchema = new mongoose.Schema(
	{
		data: { type: String, required: true },
		title: { type: String, required: true },
		entry_id: { type: String, required: true, unique: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("FeedBack", FeedBackSchema);
