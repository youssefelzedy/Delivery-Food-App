const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a customer id"],
  },
  restaurantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: [true, "Please provide a food id"],
      },
      restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "Please provide a restaurant id"],
      },
      quantity: { type: Number, required: [true, "Please provide a quantity"] },
      price: { type: Number, required: [true, "Please provide a price"] },
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, "Please provide a total amount"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "preparing", "on the way", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
