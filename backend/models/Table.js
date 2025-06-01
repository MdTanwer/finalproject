const mongoose = require("mongoose");

/**
 * Table Schema
 * Defines the structure for restaurant tables
 * Manages table information and reservation status
 */
const tableSchema = new mongoose.Schema({
  // Table identification
  name: {
    type: String,
    required: true,
    unique: true, // Each table must have a unique name
  },

  // Seating capacity
  chairs: {
    type: Number,
    required: true,
    min: 1, // Must have at least one chair
  },

  // Table availability status
  status: {
    type: String,
    enum: ["available", "reserved"], // Table can only be available or reserved
    default: "available",
  },
});

module.exports = mongoose.model("Table", tableSchema);
