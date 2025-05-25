// backend/routes/cars.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Create new car
router.post("/", async (req, res) => {
	try {
		const { plateNumber, ownerName, color, model } = req.body;
		const newCar = new Car({ plateNumber, ownerName, color, model });
		const savedCar = await newCar.save();
		res.status(201).json(savedCar);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error creating car", error: err.message });
	}
});

// Get all cars
router.get("/", async (req, res) => {
	try {
		const cars = await Car.find();
		res.json(cars);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error fetching cars", error: err.message });
	}
});

module.exports = router;
