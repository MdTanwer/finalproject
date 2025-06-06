const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getOrders);

// Get order by ID
router.get("/:id", orderController.getOrderById);

// Delete all orders
router.delete("/", orderController.deleteAllOrders);

// Update only the status of an order
router.patch("/:id/status", orderController.updateOrderStatus);

// Update takeawayStatus of an order
router.patch("/:id/takeaway-status", orderController.updateTakeawayStatus);

module.exports = router;
