const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(categoryController.getAllCategories);

router
  .route("/:restaurantId")
  .post(categoryController.createCategory)
  .get(categoryController.getCategoriesForRestaurant);

router
  .route("/:restaurantId/:id")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
