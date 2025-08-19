const mongoose = require("mongoose");

const orderTrackingSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  status: {
    type: String,
    enum: ["Canceled", "Pending", "Done"],
    required: [true, "Please provide a status of the Tracking order"],
  },
  timestamp: { type: Date, default: Date.now },
  location: {
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
    },
  },
});

const OrderTracking = mongoose.model("OrderTracking", orderTrackingSchema);
module.exports = OrderTracking;
