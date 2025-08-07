const pool = require('../config/db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: "dhbormcgi",
  api_key: "747529268123495",
  api_secret: "e-imcDaPM2qa7rDbYHeERv6o6R8",
});

// GET all dishes
exports.getAllDishes = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM dishes ORDER BY id ASC');

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ success: false, message: 'Error retrieving dishes' });
  }
};

// GET dish by ID
exports.getDishById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM dishes WHERE id = ?', [req.params.id]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: 'Dish not found' });

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new dish
exports.createDish = async (req, res) => {
  try {
    const { name, price, cuisine_type, category_id } = req.body;

    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required.' });

    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence/dishes' });
    fs.unlinkSync(req.file.path);

    const [insert] = await pool.execute(
      'INSERT INTO dishes (name, price, cuisine_type, dish_image, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, price, cuisine_type, result.secure_url, category_id]
    );

    res.status(201).json({
      success: true,
      message: 'Dish created',
      data: { id: insert.insertId, name, price, cuisine_type, dish_image: result.secure_url, category_id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE dish
exports.updateDish = async (req, res) => {
  try {
    const { name, price, cuisine_type, category_id } = req.body;
    const id = req.params.id;

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'L-essence/dishes' });
      fs.unlinkSync(req.file.path);
      imageUrl = result.secure_url;
    }

    const [update] = await pool.execute(
      'UPDATE dishes SET name = ?, price = ?, cuisine_type = ?, category_id = ?, dish_image = COALESCE(?, dish_image) WHERE id = ?',
      [name, price, cuisine_type, category_id, imageUrl, id]
    );

    if (update.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Dish not found' });

    res.status(200).json({ success: true, message: 'Dish updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE dish
exports.deleteDish = async (req, res) => {
  try {
    const id = req.params.id;

    const [del] = await pool.execute('DELETE FROM dishes WHERE id = ?', [id]);

    if (del.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Dish not found' });

    res.status(200).json({ success: true, message: 'Dish deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
