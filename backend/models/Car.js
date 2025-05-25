// backend/models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
	plateNumber: { type: String, required: true, unique: true },
	ownerName: { type: String, required: true },
	color: { type: String },
	model: { type: String },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", carSchema);
