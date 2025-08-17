// controllers/adminController.js
const db = require("../config/db");

exports.getAdminStats = async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS count FROM users");
    const [categories] = await db.query("SELECT COUNT(*) AS count FROM categories");
    const [dishes] = await db.query("SELECT COUNT(*) AS count FROM dishes");
    const [tables] = await db.query("SELECT COUNT(*) AS count FROM tables");

    res.json({
      users: users[0].count,
      categories: categories[0].count,
      dishes: dishes[0].count,
      tables: tables[0].count,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getLastBookings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT b.booking_id, b.booking_date, b.status, t.location, ts.start_time, ts.end_time
       FROM Bookings b
       JOIN tables t ON b.table_id = t.table_id
       JOIN timeslots ts ON b.timeslot_id = ts.timeslot_id
       ORDER BY b.booking_date DESC, ts.start_time DESC
       LIMIT 5`
    );
    res.json({ bookings: rows });
  } catch (err) {
    console.error("Error fetching last bookings:", err);
    res.status(500).json({ error: "Server error" });
  }
};
