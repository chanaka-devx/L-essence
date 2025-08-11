const db = require("../config/db");

exports.getAllTimeSlots = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT timeslot_id, start_time, end_time FROM timeslots ORDER BY start_time ASC");

    // Format time strings to e.g. '12:00 PM'
    const formattedSlots = rows.map(slot => {
      const formatTime = (timeStr) => {
        
        const date = new Date(`1970-01-01T${timeStr}Z`); 

        // Format to 'h:mm AM/PM' style, e.g. '12:00 PM'
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC' // keep in UTC to prevent timezone shift
        });
      };

      return {
        timeslot_id: slot.timeslot_id,
        start_time: formatTime(slot.start_time),
        end_time: formatTime(slot.end_time)
      };
    });

    res.json({ success: true, timeslots: formattedSlots });
  } catch (err) {
    console.error("Error fetching timeslots:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

