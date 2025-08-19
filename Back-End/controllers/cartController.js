const Cart = require("./../models/cartModel");
const Food = require("./../models/foodModel");
const Restaurant = require("./../models/restaurantModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { foodId, restaurantId, quantity } = req.body;
  const customerId = req.user.id;

  if (!foodId || !restaurantId || !quantity) {
    return next(
      new AppError("Please provide foodId, restaurantId, and quantity", 400)
    );
  }

  const food = await Food.findById(foodId);
  if (!food || !food.availability) {
    return next(new AppError("Food item not found or is unavailable.", 404));
  }
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    return next(new AppError("Restaurant not found.", 404));
  }

  let cart = await Cart.findOne({ customerId });

  if (cart) {
    if (
      cart.items.length > 0 &&
      String(cart.items[0].restaurantId) !== restaurantId
    ) {
      return next(
        new AppError(
          "You can only add items from one restaurant at a time. Please clear your current cart to order from a different restaurant.",
          400
        )
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) => String(item.foodId) === foodId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price = food.price; // Ensure price is always current
    } else {
      cart.items.push({ foodId, restaurantId, quantity, price: food.price });
    }
  } else {
    cart = await Cart.create({
      customerId,
      items: [{ foodId, restaurantId, quantity, price: food.price }],
    });
  }

  await cart.save();

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.updateCartItem = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const { foodId } = req.params;
  const customerId = req.user.id;

  if (quantity === undefined || quantity < 0) {
    return next(new AppError("Quantity must be a non-negative number.", 400));
  }

  let cart = await Cart.findOne({ customerId });

  if (!cart) {
    return next(new AppError("Cart not found for this customer.", 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => String(item.foodId) === foodId
  );

  if (itemIndex === -1) {
    return next(new AppError("Food item not found in cart.", 404));
  }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  // *** REMOVE: cart.totalAmount = calculateCartTotal(cart.items); // This is now handled by your model's pre-save hook
  await cart.save(); // pre('save') hook will compute totalAmount here

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const { foodId } = req.params;
  const customerId = req.user.id;

  let cart = await Cart.findOne({ customerId });

  if (!cart) {
    return next(new AppError("Cart not found for this customer.", 404));
  }

  const initialLength = cart.items.length;
  cart.items = cart.items.filter((item) => String(item.foodId) !== foodId);

  if (cart.items.length === initialLength) {
    return next(new AppError("Food item not found in cart.", 404));
  }

  await cart.save(); // pre('save') hook will compute totalAmount here

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});

exports.getCustomerCart = catchAsync(async (req, res, next) => {
  const customerId = req.user.id;

  const cart = await Cart.findOne({ customerId })
    .populate({
      path: "items.foodId",
      select: "name price image",
    })
    .populate({
      path: "items.restaurantId",
      select: "name location.address",
    });

  if (!cart) {
    return next(new AppError("Cart not found for this customer.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
