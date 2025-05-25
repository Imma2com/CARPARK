class ParkingOrder {
  constructor(userId, vehicleNumber, parkingSlot, durationHours) {
    this.userId = userId;
    this.vehicleNumber = vehicleNumber;
    this.parkingSlot = parkingSlot;
    this.durationHours = durationHours;
    this.status = 'Pending';
    this.createdAt = new Date();
  }

  confirmOrder() {
    this.status = 'Confirmed';
    this.confirmedAt = new Date();
  }

  cancelOrder() {
    this.status = 'Cancelled';
    this.cancelledAt = new Date();
  }

  getOrderSummary() {
    return {
      userId: this.userId,
      vehicleNumber: this.vehicleNumber,
      parkingSlot: this.parkingSlot,
      durationHours: this.durationHours,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}

// 🧪 Example usage:
const order1 = new ParkingOrder(101, 'ABC-1234', 12, 3);
console.log('Before confirmation:', order1.getOrderSummary());

order1.confirmOrder();
console.log('After confirmation:', order1.getOrderSummary());

order1.cancelOrder(); // Optionally cancel it again
console.log('After cancellation:', order1.getOrderSummary());
