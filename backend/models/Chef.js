const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  orderTaken: { type: Number, default: 0 },
});

module.exports = mongoose.model("Chef", chefSchema);

// To seed initial chef data, you can run this in a script or MongoDB shell:
// Chef.insertMany([
//   { name: "Manesh", orderTaken: 3 },
//   { name: "Pritam", orderTaken: 7 },
//   { name: "Yash", orderTaken: 5 },
//   { name: "Tenzen", orderTaken: 8 },
// ]);
