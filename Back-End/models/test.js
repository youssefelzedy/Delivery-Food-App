const mongoose = require("mongoose");
const Cart = require("./cartModel");

mongoose
  .connect("mongodb://localhost:27017/Delivery-Food-App", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const newCart = new Cart({
  customerId: "671669196ce46823f61d5cc7",
});

newCart.save().then((cart) => {
  console.log("Cart created without items:", cart);
});
