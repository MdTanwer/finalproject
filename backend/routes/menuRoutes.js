const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Get all products
router.get("/", menuController.getAllProducts);

// Delete a product by ID
router.delete("/:id", menuController.deleteProduct);

// Delete all products
router.delete("/", menuController.deleteAllProducts);

// Seed products
router.post("/seed", menuController.seedProducts);

module.exports = router;
