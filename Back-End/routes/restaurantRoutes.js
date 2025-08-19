const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(restaurantController.getAllRestaurants)
  .post(
    authController.restrictTo("restaurant"),
    restaurantController.createRestaurant
  );

router.route("/:id/orders").get(restaurantController.getRestaurantOrders);

router
  .route("/:id")
  .get(restaurantController.getRestaurant)
  .patch(
    authController.restrictTo("restaurant"),
    restaurantController.updateRestaurant
  )
  .delete(
    authController.restrictTo("restaurant"),
    restaurantController.deleteRestaurant
  );

module.exports = router;
