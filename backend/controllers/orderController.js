const Order = require("../models/Order");
const Table = require("../models/Table");
const Chef = require("../models/Chef");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { table } = req.body;
    let tableName = " Table 01"; // Default table name

    if (table) {
      const tableDoc = await Table.findById(table);
      if (!tableDoc) {
        return res.status(400).json({ error: "Invalid table ID" });
      }
      tableName = tableDoc.name;
    }

    // Find the chef with the minimum orderTaken
    const chef = await Chef.findOne().sort({ orderTaken: 1 });
    if (!chef) {
      return res.status(400).json({ error: "No chefs available" });
    }
    chef.orderTaken += 1;
    await chef.save();

    // Find the current max orderId
    const lastOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const nextOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const order = new Order({
      ...req.body,
      tableName,
      orderId: nextOrderId,
      chef: chef._id, // Assign chef
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create order", details: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Delete all orders
exports.deleteAllOrders = async (req, res) => {
  try {
    const result = await Order.deleteMany();
    res.json({
      message: "All orders deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete all orders" });
  }
};

// Update only the status of an order by ID
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update order status", details: err.message });
  }
};
