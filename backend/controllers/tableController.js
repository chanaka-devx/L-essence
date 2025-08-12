const pool = require('../config/db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getAvailableTables = async (req, res) => {
  const { date, timeslot_id } = req.query;

  if (!date || !timeslot_id) {
    return res.status(400).json({ error: "Missing date or timeslot_id query parameters" });
  }

  try {
    
    const query = `
      SELECT table_id, location, seats, table_image
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

// GET all tables
exports.getAllTables = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tables ORDER BY table_id ASC');

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ success: false, message: 'Error retrieving tables' });
  }
};

// GET table by ID
exports.getTableById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tables WHERE table_id = ?', [req.params.id]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Table not found' });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new table
exports.createTable = async (req, res) => {
  try {
    const { location, seats, status } = req.body;

    if (!req.file) return res.status(400).json({ success: false, message: 'Table image is required.' });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence/tables' });
    fs.unlinkSync(req.file.path);

    const [insert] = await pool.execute(
      'INSERT INTO tables (location, seats, table_image) VALUES (?, ?, ?)',
      [location, seats, result.secure_url]
    );

    res.status(201).json({
      success: true,
      message: 'Table created successfully',
      data: {
        id: insert.insertId,
        location,
        seats,
        table_image: result.secure_url
      },
    });
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE table
exports.updateTable = async (req, res) => {
  try {
    const { location, seats} = req.body;
    const id = req.params.id;

    // Check if table exists first
    const [existingTable] = await pool.execute('SELECT * FROM tables WHERE table_id = ?', [id]);
    if (existingTable.length === 0) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    let imageUrl = null;
    if (req.file) {
      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence/tables' });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;

    }

    const [update] = await pool.execute(
      'UPDATE tables SET location = ?, seats = ?, table_image = COALESCE(?, table_image) WHERE table_id = ?',
      [location, seats, imageUrl, id]
    );

    if (update.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Table not found' });

    // Get updated table data
    const [updatedTable] = await pool.execute('SELECT * FROM tables WHERE table_id = ?', [id]);

    res.status(200).json({ 
      success: true, 
      message: 'Table updated successfully',
      data: updatedTable[0]
    });
  } catch (error) {
    console.error('Error updating table:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE table
exports.deleteTable = async (req, res) => {
  try {
    const id = req.params.id;

    // Get table data before deletion to potentially delete image from Cloudinary
    const [existingTable] = await pool.execute('SELECT * FROM tables WHERE table_id = ?', [id]);
    if (existingTable.length === 0) {
      return res.status(404).json({ success: false, message: 'Table not found' });
    }

    const [del] = await pool.execute('DELETE FROM tables WHERE table_id = ?', [id]);

    if (del.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Table not found' });

    res.status(200).json({ success: true, message: 'Table deleted successfully' });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
