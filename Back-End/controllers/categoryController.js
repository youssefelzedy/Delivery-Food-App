const Category = require("./../models/categoryModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const Categories = await Category.find().populate("foods").exec();
  res.status(200).json({
    status: "success",
    results: Categories.length,
    data: {
      Categories,
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create({
    restaurantId: req.params.restaurantId,
    name: req.body.name,
    description: req.body.description,
  });
  res.status(201).json({
    status: "success",
    data: {
      category: newCategory,
    },
  });
});

exports.getCategoriesForRestaurant = catchAsync(async (req, res, next) => {
  const Categories = await Category.find({
    restaurantId: req.params.restaurantId,
  })
    .populate("foods")
    .exec();
  res.status(200).json({
    status: "success",
    results: Categories.length,
    data: {
      Categories,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
