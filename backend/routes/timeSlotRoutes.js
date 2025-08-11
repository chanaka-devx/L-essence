const express = require("express");
const router = express.Router();
const timeslotController = require('../controllers/timeSlotController');

router.get("/", timeslotController.getAllTimeSlots);

module.exports = router;
