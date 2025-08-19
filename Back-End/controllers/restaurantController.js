const Restaurant = require("./../models/restaurantModel");
const Order = require("./../models/orderModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const newRestaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      restaurant: newRestaurant,
    },
  });
});

exports.getRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(new AppError("No restaurant found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getRestaurantOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ "items.restaurantId": req.params.id });

  if (!orders) {
    return next(new AppError("No orders found for this restaurant", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      orders: orders,
    },
  });
});
