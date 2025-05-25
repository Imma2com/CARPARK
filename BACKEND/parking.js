// backend/routes/parking.js
const express = require('express');
const ParkingArea = require('../models/ParkingArea');
const router = express.Router();

// Get all parking areas
router.get('/', async (req, res) => {
  try {
    const areas = await ParkingArea.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new parking area
router.post('/', async (req, res) => {
  const { name, location, totalSpots } = req.body;
  try {
    const newArea = new ParkingArea({
      name,
      location,
      totalSpots,
      availableSpots: totalSpots,
    });
    await newArea.save();
    res.status(201).json({ message: 'Parking area added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;