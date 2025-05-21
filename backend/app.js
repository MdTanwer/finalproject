const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

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
