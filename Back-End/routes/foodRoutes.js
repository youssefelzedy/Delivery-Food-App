const express = require("express");
const foodController = require("../controllers/foodController");

const router = express.Router();

router
  .route("/")
  .get(foodController.getAllFoodController)
  .post(foodController.createFoodController);

router
  .route("/:restaurantId")
  .get(foodController.getFoodForRestaurantController);

router
  .route("/:restaurantId/:id")
  .get(foodController.getFoodController)
  .patch(foodController.updatefoodController)
  .delete(foodController.deletefoodController);

module.exports = router;
