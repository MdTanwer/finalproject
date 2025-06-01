const mongoose = require("mongoose");

/**
 * MenuItem Schema
 * Defines the structure for menu items available in the restaurant
 * Includes details about the item, pricing, and delivery information
 */
const menuItemSchema = new mongoose.Schema({
  // Basic item details
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., pizza, burger, drink, etc.
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL to item's image

  // Delivery related information
  deliveryTime: { type: Number, required: true }, // in minutes
  deliveryCharge: { type: Number, required: true },
});

module.exports = mongoose.model("MenuItem", menuItemSchema);
