const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
	{
		vehicleNumber: { type: String, required: true, unique: true },
		vehicleType: { type: String, required: true },
		ownerName: { type: String, required: true },
		contact: { type: String, required: true },
		description: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
