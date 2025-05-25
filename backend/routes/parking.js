// routes/parking.js
const express = require("express");
const router = express.Router();
const ParkedVehicle = require("../models/ParkedVehicle");

// POST /api/parking/park
router.post("/park", async (req, res) => {
	try {
		const { vehicleType, plateNumber, ownerName, contact, description } =
			req.body;

		// Optional: validate input here

		const parked = new ParkedVehicle({
			vehicleType,
			plateNumber,
			ownerName,
			contact,
			description,
			parkedAt: new Date(),
		});

		await parked.save();
		res.status(201).json(parked);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Server error" });
	}
});

// GET /api/parking/parked-cars
router.get("/parked-cars", async (req, res) => {
	try {
		const parkedCars = await ParkedVehicle.find({});
		res.json(parkedCars);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch parked cars" });
	}
});

module.exports = router;
