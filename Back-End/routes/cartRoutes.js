const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router
  .route("/:customerId")
  .get(cartController.getCartForCustomer)
  .patch(cartController.editCart);
