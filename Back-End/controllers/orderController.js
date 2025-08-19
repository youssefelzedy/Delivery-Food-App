const Order = require("./../models/orderModel");
const Cart = require("./../models/cartModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getCustomerOrders = catchAsync(async (req, res, next) => {
  const customerId = req.user.id;

  const orders = await Order.find({ customerId: customerId });
  //  .populate("items.foodId", "name price")
  //  .populate("items.restaurantId", "name")
  //  .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: {
      orders: orders,
    },
  });
});

exports.placeOrder = catchAsync(async (req, res, next) => {
  const customerId = req.user.id;
  const { deliveryAddress, paymentMethod } = req.body;

  if (!deliveryAddress || !paymentMethod) {
    return next(
      new AppError("Please provide delivery address and payment method", 400)
    );
  }

  // check if the cart is empty
  const cart = await Cart.findOne({ customerId: customerId });

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Your cart is empty", 400));
  }

  let restaurantIdForOrder = String(cart.items[0].restaurantId);

  for (const item of cart.items) {
    if (String(item.restaurantId) !== restaurantIdForOrder) {
      return next(
        new AppError(
          "All items in the cart must be from the same restaurant",
          400
        )
      );
    }
  }

  const orderItems = cart.items.map((item) => ({
    foodId: item.foodId,
    restaurantId: item.restaurantId,
    quantity: item.quantity,
    price: item.price,
  }));

  const newOrder = await Order.create({
    customerId: customerId,
    items: orderItems,
    totalAmount: cart.totalAmount,
    deliveryAddress: deliveryAddress,
    paymentMethod: paymentMethod,
  });

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
