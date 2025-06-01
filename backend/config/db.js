const mongoose = require("mongoose");

/**
 * Database Connection Configuration
 * Establishes connection to MongoDB Atlas cluster
 * Handles connection errors and success logging
 */
const connectDB = async () => {
  try {
    // TODO: Move this URI to environment variables for security
    const conn = await mongoose.connect(
      "mongodb+srv://tanwirisrafil:hSW1lfw5OO1iKfvm@demo.ldotqmm.mongodb.net/?retryWrites=true&w=majority&appName=demo"
    );

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log connection error and exit process
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
