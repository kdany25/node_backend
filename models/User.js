import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String, required: true },
		gender: {
			type: String,
			enum: ["MALE", "FEMALE"],
			// required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
