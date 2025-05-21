const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://tanwirisrafil:hSW1lfw5OO1iKfvm@demo.ldotqmm.mongodb.net/?retryWrites=true&w=majority&appName=demo"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
