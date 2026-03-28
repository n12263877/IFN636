const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    price: Number,
    ram: String,
    storage: String,
    processor: String,
    image: String,
    description: String,
    stock: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
