const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  food: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
    },
  ],
});

categorySchema.virtual("foods", {
  ref: "Food", // Model to use
  localField: "_id", // Field in the Category model
  foreignField: "categoryId", // Field in the Food model
});

categorySchema.set("toObject", { virtuals: true }); // Ensure virtual fields are included when using toObject()
categorySchema.set("toJSON", { virtuals: true }); // Ensure virtual fields are included when using toJSON()

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
