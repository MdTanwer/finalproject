const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  deliveryTime: { type: Number },
  deliveryCharge: { type: Number },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
