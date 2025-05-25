import mongoose from "mongoose";

const parkAreaSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		capacity: {
			type: Number,
			required: true,
			min: 1,
		},
		description: {
			type: String,
			default: "",
			trim: true,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields automatically
	}
);

const ParkArea = mongoose.model("ParkArea", parkAreaSchema);

export default ParkArea;
