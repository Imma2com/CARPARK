const express = require("express");
const router = express.Router();
const ParkArea = require("../models/ParkArea");

// Create a new parking area
router.post("/", async (req, res) => {
	try {
		const { areaName, capacity, description } = req.body;
		const newParkArea = new ParkArea({ areaName, capacity, description });
		const savedArea = await newParkArea.save();
		res.status(201).json(savedArea);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
});

// Fetch all parking areas
router.get("/", async (req, res) => {
	try {
		const areas = await ParkArea.find();
		res.json(areas);
	} catch (error) {
		res.status(500).json({ message: "Server error", error });
	}
});

module.exports = router;
