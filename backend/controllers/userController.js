const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP API
exports.signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    // Check if user with the email already exists
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0)
      return res.status(409).json({ error: "User with this email already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with role defaulting to 'customer'
    const [result] = await db.query(
      "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'customer')",
      [name || null, email, phone || null, hashedPassword]
    );

    const userId = result.insertId;

    const token = jwt.sign({ user_id: userId, email, role: "customer" }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Signup successful", token, role: "customer", user_id: userId });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// LOGIN API
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.role, });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;  // 👈 works now
    const [rows] = await db.query(
      "SELECT user_id, name, email, phone, role FROM users WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};


// Update logged-in user's profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await db.query(
      "UPDATE users SET name = ?, email = ?, phone = ? WHERE user_id = ?",
      [name, email, phone, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

// Fetch logged-in user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.user_id; // Logged-in user from token

    const [rows] = await db.query(
      `SELECT 
         b.booking_id, 
         b.booking_date, 
         b.status, 
         t.location, 
         ts.start_time, 
         ts.end_time
       FROM Bookings b
       JOIN tables t ON b.table_id = t.table_id
       JOIN timeslots ts ON b.timeslot_id = ts.timeslot_id
       WHERE b.user_id = ?
       ORDER BY b.booking_date DESC, ts.start_time ASC`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(200).json({ message: "No bookings found", bookings: [] });
    }

    res.json({ bookings: rows });
  } catch (err) {
    console.error("Get user bookings error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
