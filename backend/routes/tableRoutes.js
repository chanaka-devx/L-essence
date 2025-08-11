const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");

router.get("/available", tableController.getAvailableTables);

module.exports = router;
