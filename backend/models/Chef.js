const mongoose = require("mongoose");

/**
 * Chef Schema
 * Defines the structure for chef information in the restaurant
 * Tracks chef details and their workload
 */
const chefSchema = new mongoose.Schema({
  // Chef's personal information
  name: { type: String, required: true },

  // Workload tracking
  orderTaken: {
    type: Number,
    default: 0, // Number of orders currently assigned to this chef
    min: 0, // Cannot have negative orders
  },
});

module.exports = mongoose.model("Chef", chefSchema);

// To seed initial chef data, you can run this in a script or MongoDB shell:
// Chef.insertMany([
//   { name: "Manesh", orderTaken: 3 },
//   { name: "Pritam", orderTaken: 7 },
//   { name: "Yash", orderTaken: 5 },
//   { name: "Tenzen", orderTaken: 8 },
// ]);
