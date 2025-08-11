const db = require("../config/db");

exports.getAvailableTables = async (req, res) => {
  const { date, timeslot_id } = req.query;

  if (!date || !timeslot_id) {
    return res.status(400).json({ error: "Missing date or timeslot_id query parameters" });
  }

  try {
    
    const query = `
      SELECT table_id, location, seats
      FROM tables
      WHERE table_id NOT IN (
        SELECT table_id FROM Bookings
        WHERE booking_date = ? AND timeslot_id = ?
      )
      ORDER BY table_id ASC
    `;

    const [availableTables] = await db.query(query, [date, timeslot_id]);

    res.json({ success: true, availableTables });
  } catch (err) {
    console.error("Error fetching available tables:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
