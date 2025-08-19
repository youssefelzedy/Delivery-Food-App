const express = require("express");
const foodController = require("../controllers/foodController");

const router = express.Router();

router.route("/").get(foodController.getAllFoodController);

router
  .route("/:categoryId")
  .get(foodController.getFoodForCategory)
  .post(foodController.createFoodForCategory);

router
  .route("/:categoryId/:id")
  .get(foodController.getFood)
  .patch(foodController.updateFood)
  .delete(foodController.deleteFood);

module.exports = router;
