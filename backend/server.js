const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const parkAreaRoutes = require("./routes/parkAreas");

const app = express();

app.use(cors());
app.use(express.json());

// Mount your park area routes here
app.use("/api/park-areas", parkAreaRoutes);

app.get("/", (req, res) => {
	res.send("Backend API is running");
});

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
