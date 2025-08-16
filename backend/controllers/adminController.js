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

    // Insert new user with role defaulting to 'admin'
    await db.query(
      "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'admin')",
      [name || null, email, phone || null, hashedPassword]
    );

    // Generate JWT token with email and role
    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};