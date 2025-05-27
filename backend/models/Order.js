const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  orderType: { type: String, enum: ["dineIn", "takeAway"], required: true },
  specialInstructions: { type: String },
  user: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },
  deliveryAddress: { type: String },
  deliveryTime: { type: String },
  deliveryCharge: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  orderId: { type: Number, default: 0 },
  tableName: { type: String, default: "Table 01" },
  status: {
    type: String,
    enum: ["processing", "served"],
    default: "processing",
  },
  takeawayStatus: {
    type: String,
    enum: ["notPickedUp", "pickedUp"],
    default: "notPickedUp",
  },
  createdAt: { type: Date, default: Date.now },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chef" },
});

module.exports = mongoose.model("Order", orderSchema);
