const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const carRoutes = require("./routes/cars");

const app = express();
app.use("/api/cars", carRoutes);
app.use(cors());
app.use(express.json()); // parse JSON body

// Connect MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
	res.send("Backend API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
