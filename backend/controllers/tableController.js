const Table = require("../models/Table");

// Get all tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new table
exports.addTable = async (req, res) => {
  try {
    const { name, chairs } = req.body;
    const table = new Table({
      name: name || `Table ${(await Table.countDocuments()) + 1}`,
      chairs,
    });
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a table
exports.deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndDelete(id);
    res.json({ message: "Table deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
