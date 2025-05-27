const mongoose = require("mongoose");
const Chef = require("./models/Chef");
const connectDB = require("./config/db");

const chefs = [
  { name: "Manesh", orderTaken: 3 },
  { name: "Pritam", orderTaken: 7 },
  { name: "Yash", orderTaken: 5 },
  { name: "Tenzen", orderTaken: 8 },
];

async function seedChefs() {
  await connectDB();
  await Chef.deleteMany();
  await Chef.insertMany(chefs);
  console.log("Chef data seeded");
  mongoose.connection.close();
}

seedChefs();
