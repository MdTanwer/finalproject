const mongoose = require("mongoose");

/**
 * Order Schema
 * Defines the structure for orders in the restaurant system
 * Handles both dine-in and takeaway orders
 */
const orderSchema = new mongoose.Schema({
  // Array of items in the order
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem", // Reference to the MenuItem collection
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  // Type of order: dine-in, takeaway, or completed
  orderType: {
    type: String,
    enum: ["dineIn", "takeAway", "done"],
    required: true,
  },
  // Optional instructions for the kitchen
  specialInstructions: { type: String },
  // Customer information
  user: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  // Delivery details for takeaway orders
  deliveryAddress: { type: String },
  deliveryTime: { type: String },
  deliveryCharge: { type: Number, default: 0 },
  // Financial details
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  // Order tracking
  orderId: { type: Number, default: 0 }, // Sequential order number for display
  tableName: { type: String, default: "Table 01" }, // For dine-in orders
  // Order progress tracking
  status: {
    type: String,
    enum: ["processing", "served", "takeaway"],
    default: "processing",
  },
  // Takeaway order status tracking
  takeawayStatus: {
    type: String,
    enum: ["notPickedUp", "pickedUp"],
    default: "notPickedUp",
  },
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  // Chef assignment
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
});

module.exports = mongoose.model("Order", orderSchema);
