const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.post(
  "/add-item",
  authController.restrictTo("customer"),
  cartController.addItemToCart
);

router
  .route("/:foodId")
  .patch(authController.restrictTo("customer"), cartController.updateCartItem)
  .delete(
    authController.restrictTo("customer"),
    cartController.removeItemFromCart
  );

router.get(
  "/",
  authController.restrictTo("customer"),
  cartController.getCustomerCart
);

module.exports = router;