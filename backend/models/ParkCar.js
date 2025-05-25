// import mongoose from "mongoose";

// const parkCarSchema = new mongoose.Schema(
// 	{
// 		vehicle: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Vehicle",
// 			required: true,
// 		},
// 		parkArea: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "ParkArea",
// 			required: true,
// 		},
// 		parkedAt: {
// 			type: Date,
// 			default: Date.now,
// 		},
// 		// Optional: You can add exitTime or status fields if needed
// 		// exitAt: Date,
// 		// status: { type: String, enum: ['parked', 'exited'], default: 'parked' },
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// const ParkCar = mongoose.model("ParkCar", parkCarSchema);

// export default ParkCar;

import express from "express";
import ParkCar from "../models/ParkCar.js"; // adjust the import path

const router = express.Router();

router.get("/daily-activity", async (req, res) => {
	try {
		const dailyStats = await ParkCar.aggregate([
			{
				$project: {
					day: { $dateToString: { format: "%Y-%m-%d", date: "$parkedAt" } },
				},
			},
			{
				$group: {
					_id: "$day",
					count: { $sum: 1 },
				},
			},
			{
				$sort: { _id: 1 },
			},
		]);
		// Transform data for chart usage: [{ name: "2025-05-25", parked: 5 }, ...]
		const chartData = dailyStats.map((item) => ({
			name: item._id,
			parked: item.count,
		}));

		res.json(chartData);
	} catch (error) {
		console.error("Error fetching daily activity:", error);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
