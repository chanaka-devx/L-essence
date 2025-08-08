const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP API
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  try {
    // check if already exists
    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
    if (rows.length > 0)
      return res.status(409).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      hashedPassword,
    ]);

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ message: "Signup successful", token });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password are required" });

  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
    if (rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
