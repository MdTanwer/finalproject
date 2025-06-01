const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finalproject-seven-xi.vercel.app",
      "https://finalproject-git-main-md-tanwirs-projects.vercel.app",
    ],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Table routes
app.use("/api/tables", require("./routes/tableRoutes"));
// Menu item routes
app.use("/api/products", require("./routes/productRoutes"));
// Order routes
app.use("/api/orders", require("./routes/orderRoutes"));
// Chef routes
app.use("/api/chefs", require("./routes/chefRoutes"));

// Custom error handler (should be last middleware)
app.use(errorHandler);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend API" });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
