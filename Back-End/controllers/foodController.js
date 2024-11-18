const Food = require("./../models/foodModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllFoodController = catchAsync(async (req, res, next) => {
  const foods = await Food.find();
  res.status(200).json({
    status: "success",
    results: foods.length,
    data: {
      foods,
    },
  });
});

exports.createFoodForCategory = catchAsync(async (req, res, next) => {
  const newFood = await Food.create({
    categoryId: req.params.categoryId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  res.status(201).json({
    status: "success",
    data: {
      food: newFood,
    },
  });
});

exports.getFoodForCategory = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return next(new AppError("No food found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      food,
    },
  });
});

exports.updateFood = catchAsync(async (req, res, next) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      food,
    },
  });
});

exports.deleteFood = catchAsync(async (req, res, next) => {
  await Food.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getFood = catchAsync(async (req, res, next) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    return next(new AppError("No food found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      food,
    },
  });
});
