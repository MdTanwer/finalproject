const MenuItem = require("../models/MenuItem");

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await MenuItem.find();
    res.json(products);
  } catch (err) {
    next(new Error("Failed to fetch products: " + err.message));
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(new Error("Failed to delete product: " + err.message));
  }
};

// Delete all products
exports.deleteAllProducts = async (req, res, next) => {
  try {
    const result = await MenuItem.deleteMany();
    res.json({
      message: "All products deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(new Error("Failed to delete all products: " + err.message));
  }
};

// Seed products
exports.seedProducts = async (req, res, next) => {
  try {
    const seedData = [
      // Pizza
      {
        name: "Capricciosa",
        category: "pizza",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 20,
      },
      {
        name: "Marinara",
        category: "pizza",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 20,
      },
      {
        name: "Pepperoni",
        category: "pizza",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 20,
      },
      {
        name: "BBQ Chicken",
        category: "pizza",
        price: 300,
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 20,
      },
      {
        name: "Hawaiian",
        category: "pizza",
        price: 210,
        image:
          "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 20,
      },
      // Burger
      {
        name: "Classic Burger",
        category: "burger",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 5,
        deliveryCharge: 15,
      },
      {
        name: "Cheese Burger",
        category: "burger",
        price: 140,
        image:
          "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 1,
        deliveryCharge: 15,
      },
      // Drink
      {
        name: "Coke",
        category: "drink",
        price: 40,
        image:
          "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 5,
        deliveryCharge: 10,
      },
      {
        name: "Lemonade",
        category: "drink",
        price: 50,
        image:
          "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 7,
        deliveryCharge: 10,
      },
      // Fries
      {
        name: "French ",
        category: "fries",
        price: 80,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 1,
        deliveryCharge: 12,
      },
      {
        name: "Curly Fries",
        category: "fries",
        price: 90,
        image:
          "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 2,
        deliveryCharge: 12,
      },
      // Veggies
      {
        name: "Greek Salad",
        category: "veggies",
        price: 110,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 8,
        deliveryCharge: 10,
      },
      {
        name: "Veggie Bowl",
        category: "veggies",
        price: 130,
        image:
          "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
        deliveryTime: 9,
        deliveryCharge: 10,
      },
    ];
    await MenuItem.deleteMany();
    await MenuItem.insertMany(seedData);
    res.json({ message: "Products seeded" });
  } catch (err) {
    next(new Error("Failed to seed products: " + err.message));
  }
};
