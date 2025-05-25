const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const carRoutes = require("./routes/cars");
const parkAreaRoutes = require("./routes/parkAreas");
const vehicleRoutes = require("./routes/vehicles");
const parkingRoutes = require("./routes/parking"); //

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/cars", carRoutes);
app.use("/api/park-areas", parkAreaRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/parking", parkingRoutes);

mongoose;
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
	res.send("Backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
