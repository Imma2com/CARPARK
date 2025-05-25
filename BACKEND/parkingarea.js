// backend/models/ParkingArea.js
const mongoose = require('mongoose');

const ParkingAreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  availableSpots: { type: Number, default: 0 },
  totalSpots: { type: Number, required: true },
});

module.exports = mongoose.model('ParkingArea', ParkingAreaSchema);