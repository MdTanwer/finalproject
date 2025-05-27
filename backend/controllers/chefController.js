const Chef = require("../models/Chef");

// Get all chefs
exports.getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chefs" });
  }
};

// Add a new chef
exports.createChef = async (req, res) => {
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
    res.status(400).json({ error: "Failed to add chef", details: err.message });
  }
};
