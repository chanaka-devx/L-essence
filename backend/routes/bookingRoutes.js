const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Book a table
router.post("/book", bookingController.bookTable);

// Get all bookings
router.get("/all", bookingController.getAllBookings);

module.exports = router;
