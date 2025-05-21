const mongoose = require("mongoose");
const Table = require("./models/Table");

async function seedTables() {
  await mongoose.connect(
    "mongodb+srv://tanwirisrafil:hSW1lfw5OO1iKfvm@demo.ldotqmm.mongodb.net/?retryWrites=true&w=majority&appName=demo"
  );
  await Table.deleteMany({}); // Optional: clear existing tables

  const tables = Array.from({ length: 10 }, (_, i) => ({
    name: `Table ${String(i + 1).padStart(2, "0")}`,
    status: i % 2 === 0 ? "available" : "reserved",
    chairs: (i % 4) + 2,
  }));

  await Table.insertMany(tables);
  console.log("Inserted 10 dummy tables.");
  await mongoose.disconnect();
}

seedTables();
