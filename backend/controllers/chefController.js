const Chef = require("../models/Chef");

// Get all chefs
exports.getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    next(new Error("Failed to fetch chefs: " + err.message));
  }
};

// Add a new chef
exports.createChef = async (req, res, next) => {
  const chefs = [
    { name: "Manesh", orderTaken: 3 },
    { name: "Pritam", orderTaken: 7 },
    { name: "Yash", orderTaken: 5 },
    { name: "Tenzen", orderTaken: 8 },
  ];
  try {
    await Chef.deleteMany();
    await Chef.insertMany(chefs);
    res.json({ message: "chefs seeded" });
  } catch (err) {
    next(new Error("Failed to add chef: " + err.message));
  }
};
