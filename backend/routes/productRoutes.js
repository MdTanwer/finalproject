const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Delete a product by ID
router.delete("/:id", productController.deleteProduct);

// Delete all products
router.delete("/", productController.deleteAllProducts);

// Seed products
router.post("/seed", productController.seedProducts);

module.exports = router;
