const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a customer id"],
  },
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
  deliveryAddress: {
    street: { type: String, required: [true, "Please provide street address"] },
    city: { type: String, required: [true, "Please provide city"] },
    zipCode: String,
    country: { type: String, default: "Egypt" },
    apartmentNumber: String,
    buildingName: String,
    notes: String, // e.g., "Leave at front door"
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "cash_on_delivery"], // Customize based on your integrations
    required: [true, "Please specify a payment method"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "preparing", "on the way", "delivered"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre(/^find/, function (next) {
  // 'this' refers to the query object
  // This is good for any find operation to populate user/restaurant/food details
  this.populate({
    path: "customerId",
    select: "name email phone address",
  })
    .populate({
      path: "items.foodId",
      select: "name description price image",
    })
    .populate({
      path: "items.restaurantId",
      select: "name location.address phone", // Select relevant restaurant info
    });
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
