const mongoose = require("mongoose");

const parkAreaSchema = new mongoose.Schema({
	areaName: { type: String, required: true },
	capacity: { type: Number, required: true },
	description: { type: String },
});

module.exports = mongoose.model("ParkArea", parkAreaSchema);
