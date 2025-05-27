const express = require("express");
const router = express.Router();
const chefController = require("../controllers/chefController");

// GET /api/chefs - Get all chefs
router.get("/", chefController.getChefs);
// POST /api/chefs - Add a new chef
router.post("/", chefController.createChef);

module.exports = router;
