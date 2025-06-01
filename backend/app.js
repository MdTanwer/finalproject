/**
 * Main Application Entry Point
 * Sets up Express server with middleware and routes
 */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");

const app = express();

// CORS Configuration
// Allow requests from frontend applications
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finalproject-seven-xi.vercel.app",
      "https://finalproject-git-main-md-tanwirs-projects.vercel.app",
    ],
  })
);

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Definitions
app.use("/api/tables", require("./routes/tableRoutes")); // Table management
app.use("/api/products", require("./routes/productRoutes")); // Menu items
app.use("/api/orders", require("./routes/orderRoutes")); // Order processing
app.use("/api/chefs", require("./routes/chefRoutes")); // Chef management

// Global Error Handler
app.use(errorHandler);

// Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend API" });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Connect to MongoDB when server starts
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
