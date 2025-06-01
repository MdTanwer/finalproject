const Order = require("../models/Order");
const Table = require("../models/Table");
const Chef = require("../models/Chef");

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    // Find the chef with the minimum orderTaken
    const chef = await Chef.findOne().sort({ orderTaken: 1 });
    if (!chef) {
      return next(new Error("No chefs available"));
    }
    chef.orderTaken += 1;
    await chef.save();

    // Find the current max orderId
    const lastOrder = await Order.findOne({}, {}, { sort: { orderId: -1 } });
    const nextOrderId = lastOrder ? lastOrder.orderId + 1 : 1;

    const order = new Order({
      ...req.body,
      orderId: nextOrderId,
      chef: chef._id, // Assign chef
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(new Error("Failed to create order: " + err.message));
  }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items.menuItem");
    res.json(orders);
  } catch (err) {
    next(new Error("Failed to fetch orders: " + err.message));
  }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.menuItem"
    );
    if (!order) return next(new Error("Order not found"));
    res.json(order);
  } catch (err) {
    next(new Error("Failed to fetch order: " + err.message));
  }
};

// Delete all orders
exports.deleteAllOrders = async (req, res, next) => {
  try {
    const result = await Order.deleteMany();
    res.json({
      message: "All orders deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(new Error("Failed to delete all orders: " + err.message));
  }
};

// Update only the status of an order by ID
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return next(new Error("Order not found"));
    res.json(order);
  } catch (err) {
    next(new Error("Failed to update order status: " + err.message));
  }
};

// Update takeawayStatus of an order by ID
exports.updateTakeawayStatus = async (req, res, next) => {
  try {
    const { takeawayStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { takeawayStatus },
      { new: true }
    );
    if (!order) return next(new Error("Order not found"));
    res.json(order);
  } catch (err) {
    next(new Error("Failed to update takeaway status: " + err.message));
  }
};
