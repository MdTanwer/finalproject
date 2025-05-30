const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

router.get("/", tableController.getTables);
router.post("/", tableController.addTable);
router.delete("/:id", tableController.deleteTable);
router.patch("/:id", tableController.updateTableStatus);

module.exports = router;
