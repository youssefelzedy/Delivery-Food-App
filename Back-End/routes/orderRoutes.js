const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController")

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(authController.restrictTo("customer"), orderController.placeOrder);

// router
//   .route("/:id")
//    .get(authController.restrictTo("customer", "restaurant"), orderController.getOrder)
//    .patch(authController.restrictTo("restaurant"), orderController.updateOrder)
//    .delete(authController.restrictTo("restaurant"), orderController.deleteOrder); // still think


router
   .route("/customer")
   .get(authController.restrictTo("customer"), orderController.getCustomerOrders);

module.exports = router;