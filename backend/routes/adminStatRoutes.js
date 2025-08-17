const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminStatController");
const auth = require("../middleware/authMiddleware");

// GET /api/admin/stats
router.get("/stats", auth, adminController.getAdminStats);

router.get("/last-bookings", auth, adminController.getLastBookings);

module.exports = router;
