import Car from "../models/carModel.js";

// @desc    Create a new car
// @route   POST /api/cars
// @access  Public (or private if you add auth later)
export const createCar = async (req, res) => {
	try {
		const { plateNumber, ownerName, model, color } = req.body;

		if (!plateNumber || !ownerName) {
			return res
				.status(400)
				.json({ message: "Plate number and owner name are required" });
		}

		const newCar = new Car({
			plateNumber,
			ownerName,
			model,
			color,
		});

		const savedCar = await newCar.save();
		res.status(201).json(savedCar);
	} catch (error) {
		console.error("Error creating car:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
	try {
		const cars = await Car.find({});
		res.json(cars);
	} catch (error) {
		console.error("Error fetching cars:", error);
		res.status(500).json({ message: "Server error" });
	}
};
