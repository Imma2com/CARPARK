import ParkedCar from "../models/parkCarModel.js";

// @desc    Park a car (create parked car entry)
// @route   POST /api/parkedcars
// @access  Public (adjust as needed)
export const parkCar = async (req, res) => {
	try {
		const { vehicleId, parkAreaId, parkedAt } = req.body;

		if (!vehicleId || !parkAreaId) {
			return res
				.status(400)
				.json({ message: "Vehicle ID and Park Area ID are required" });
		}

		const newParkedCar = new ParkedCar({
			vehicle: vehicleId,
			parkArea: parkAreaId,
			parkedAt: parkedAt || new Date(),
		});

		const savedParkedCar = await newParkedCar.save();
		res.status(201).json(savedParkedCar);
	} catch (error) {
		console.error("Error parking car:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// @desc    Get all parked cars
// @route   GET /api/parkedcars
// @access  Public
export const getParkedCars = async (req, res) => {
	try {
		// Populate vehicle and parkArea references for useful data
		const parkedCars = await ParkedCar.find({})
			.populate("vehicle")
			.populate("parkArea");
		res.json(parkedCars);
	} catch (error) {
		console.error("Error fetching parked cars:", error);
		res.status(500).json({ message: "Server error" });
	}
};
