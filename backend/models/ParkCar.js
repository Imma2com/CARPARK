import mongoose from "mongoose";

const parkCarSchema = new mongoose.Schema(
	{
		vehicle: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vehicle",
			required: true,
		},
		parkArea: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ParkArea",
			required: true,
		},
		parkedAt: {
			type: Date,
			default: Date.now,
		},
		// Optional: You can add exitTime or status fields if needed
		// exitAt: Date,
		// status: { type: String, enum: ['parked', 'exited'], default: 'parked' },
	},
	{
		timestamps: true,
	}
);

const ParkCar = mongoose.model("ParkCar", parkCarSchema);

export default ParkCar;
