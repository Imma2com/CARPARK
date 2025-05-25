import React, { useState } from 'react';
import './ParkingLot.css'; // Optional for styling

const TOTAL_SLOTS = 10;

function ParkingLot() {
  const [slots, setSlots] = useState(Array(TOTAL_SLOTS).fill(false));

  const handlePark = (index) => {
    if (!slots[index]) {
      const updatedSlots = [...slots];
      updatedSlots[index] = true;
      setSlots(updatedSlots);
    }
  };

  const isFull = slots.every((slot) => slot === true);

  return (
    <div className="parking-container">
      <h2>🚗 Well Parking System</h2>
      <div className="slot-grid">
        {slots.map((filled, index) => (
          <div
            key={index}
            className={`slot ${filled ? 'filled' : 'available'}`}
            onClick={() => handlePark(index)}
          >
            {filled ? 'Filled' : 'Available'}
          </div>
        ))}
      </div>
      {isFull && <div className="full-message">🚫 Parking Full</div>}
    </div>
  );
}

export default ParkingLot;
