const Table = require("../models/Table");

// Get all tables
exports.getTables = async (req, res, next) => {
  try {
    let tables = await Table.find();
    // Sort by numeric part of name (e.g., 'Table 01', 'Table 02', ...)
    tables.sort((a, b) => {
      const numA = parseInt(a.name.replace(/[^\d]/g, ""), 10);
      const numB = parseInt(b.name.replace(/[^\d]/g, ""), 10);
      return numA - numB;
    });
    res.json(tables);
  } catch (err) {
    next(new Error(err.message));
  }
};

// Add a new table
exports.addTable = async (req, res, next) => {
  try {
    const { name, chairs } = req.body;
    const table = new Table({
      name: name || `Table ${(await Table.countDocuments()) + 1}`,
      chairs,
    });
    await table.save();
    res.status(201).json(table);
  } catch (err) {
    next(new Error(err.message));
  }
};

// Delete a table
exports.deleteTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndDelete(id);
    res.json({ message: "Table deleted" });
  } catch (err) {
    next(new Error(err.message));
  }
};

// Update a table's status
exports.updateTableStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Find the table by id
    const table = await Table.findById(id);
    if (!table) {
      return next(new Error("Table not found"));
    }
    // Only allow changing from 'available' to 'reserved'
    if (table.status === "available") {
      table.status = "reserved";
      await table.save();
      return res.json(table);
    } else {
      // If already reserved, do not allow changing back to available
      return next(
        new Error("Cannot change status from 'reserved' to 'available'")
      );
    }
  } catch (err) {
    next(new Error(err.message));
  }
};
