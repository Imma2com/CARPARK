const mongoose = require("mongoose");

const ParkedVehicleSchema = new mongoose.Schema({
	vehicleType: String,
	plateNumber: String,
	ownerName: String,
	contact: String,
	description: String,
	parkedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("ParkedVehicle", ParkedVehicleSchema);
