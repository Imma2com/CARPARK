const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// Add a new vehicle
router.post("/", async (req, res) => {
	try {
		const vehicle = new Vehicle(req.body);
		await vehicle.save();
		res.status(201).json({ message: "Vehicle added successfully", vehicle });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json({ message: "Error adding vehicle", error: err.message });
	}
});

// Get all vehicles
router.get("/", async (req, res) => {
	try {
		const vehicles = await Vehicle.find().sort({ createdAt: -1 });
		res.json(vehicles);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error fetching vehicles", error: err.message });
	}
});

module.exports = router;
