const db = require("../config/db");

// Book a table
exports.bookTable = async (req, res) => {
  const { table_id, timeslot_id, user_id, booking_date } = req.body;

  if (!table_id || !timeslot_id || !user_id || !booking_date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if the table is already booked for that date & timeslot
    const [existing] = await db.query(
      `SELECT * FROM Bookings 
       WHERE table_id = ? AND timeslot_id = ? AND booking_date = ?`,
      [table_id, timeslot_id, booking_date]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "Table already booked for this slot" });
    }

    // Insert booking
    await db.query(
      `INSERT INTO Bookings (table_id, timeslot_id, user_id, booking_date)
       VALUES (?, ?, ?, ?)`,
      [table_id, timeslot_id, user_id, booking_date]
    );

    res.json({ message: "Table booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Query to fetch booking info along with user name, table number, and timeslot times
    const [bookings] = await db.query(`
      SELECT 
        b.booking_id,
        b.booking_date,
        u.name AS customer_name,
        u.email AS customer_email,
        t.location AS table_location,
        t.seats AS table_seats
      FROM Bookings b
      JOIN users u ON b.user_id = u.user_id
      JOIN tables t ON b.table_id = t.table_id
      JOIN timeslots ts ON b.timeslot_id = ts.timeslot_id
      ORDER BY b.booking_date DESC
    `);

    res.json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
