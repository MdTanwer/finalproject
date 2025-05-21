const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "reserved"],
    default: "available",
  },
  chairs: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Table", tableSchema);
