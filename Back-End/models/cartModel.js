const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        restaurantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 },
      },
    ],
    totalAmount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware to calculate totalAmount before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  next();
});

// Middleware to calculate totalAmount before updating
cartSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.items) {
    const totalAmount = update.items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
    update.totalAmount = totalAmount;
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
