import ParkArea from "../models/parkAreaModel.js";

// @desc    Create a new parking area
// @route   POST /api/parkareas
// @access  Public (can be changed later)
export const createParkArea = async (req, res) => {
	try {
		const { name, capacity, description } = req.body;

		if (!name || !capacity) {
			return res
				.status(400)
				.json({ message: "Name and capacity are required" });
		}

		const newParkArea = new ParkArea({
			name,
			capacity,
			description,
		});

		const savedArea = await newParkArea.save();
		res.status(201).json(savedArea);
	} catch (error) {
		console.error("Error creating park area:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc    Get all parking areas
// @route   GET /api/parkareas
// @access  Public
export const getParkAreas = async (req, res) => {
	try {
		const areas = await ParkArea.find({});
		res.json(areas);
	} catch (error) {
		console.error("Error fetching park areas:", error);
		res.status(500).json({ message: "Server error" });
	}
};
