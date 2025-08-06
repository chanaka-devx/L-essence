// Get all categories
const pool = require('../config/db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, description, image FROM categories ORDER BY id ASC'
    );

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving categories',
    });
  }
};

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: "dhbormcgi",
  api_key: "747529268123495",
  api_secret: "e-imcDaPM2qa7rDbYHeERv6o6R8",
});

// ==========================
// CREATE Category
// ==========================
exports.createCategory = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required.' });

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence' });
    fs.unlinkSync(req.file.path); // remove temp file

    const [insert] = await pool.execute(
      'INSERT INTO categories (title, description, image) VALUES (?, ?, ?)',
      [title, description, result.secure_url]
    );

    res.status(201).json({
      success: true,
      message: 'Category created',
      data: { id: insert.insertId, title, description, image: result.secure_url },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// GET Category by ID
// ==========================
exports.getCategoryById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// UPDATE Category
// ==========================
exports.updateCategory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence' });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
    }

    const [update] = await pool.execute(
      'UPDATE categories SET title = ?, description = ?, image = COALESCE(?, image) WHERE id = ?',
      [title, description, imageUrl, id]
    );

    if (update.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// DELETE Category
// ==========================
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const [del] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);

    if (del.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
