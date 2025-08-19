const pool = require('../config/db');
const { uploadToCloudinary } = require('../utils/upload');
const dotenv = require('dotenv');

dotenv.config();

exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, description, image FROM categories ORDER BY id ASC'
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
// No longer needed as it's configured in utils/upload.js

// GET all dishes of a specific category
exports.getDishesByCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [[category]] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const [dishes] = await pool.execute(
      'SELECT * FROM dishes WHERE category_id = ?',
      [categoryId]
    );

    res.status(200).json({
      success: true,
      data: {
        category,
        dishes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET count of dishes in a specific category
exports.getDishCountByCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const [[category]] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const [[result]] = await pool.execute(
      'SELECT COUNT(*) as count FROM dishes WHERE category_id = ?',
      [categoryId]
    );

    res.status(200).json({
      success: true,
      count: result.count || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer ? 'Buffer present' : 'Buffer missing'
    } : 'No file');
    
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and description are required.' 
      });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Image is required.' 
      });
    }

    // Upload image to Cloudinary directly from buffer
    let result;
    try {
      if (!req.file.buffer) {
        return res.status(400).json({
          success: false,
          message: 'Invalid file upload. File buffer is missing.'
        });
      }
      result = await uploadToCloudinary(req.file.buffer, 'L-essence/categories');
      if (!result || !result.secure_url) {
        throw new Error('Failed to get secure URL from Cloudinary');
      }
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to cloud storage',
        error: uploadError.message
      });
    }
    

    const [insert] = await pool.execute(
      'INSERT INTO categories (name, description, image) VALUES (?, ?, ?)',
      [name, description, result.secure_url]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { 
        id: insert.insertId, 
        name, 
        description, 
        image: result.secure_url 
      },
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create category' 
    });
  }
};

// GET Category by ID
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

// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id;

    let imageUrl = null;
    if (req.file) {
      try {
        if (!req.file.buffer) {
          return res.status(400).json({
            success: false,
            message: 'Invalid file upload. File buffer is missing.'
          });
        }
        const result = await uploadToCloudinary(req.file.buffer, 'L-essence');
        if (!result || !result.secure_url) {
          throw new Error('Failed to get secure URL from Cloudinary');
        }
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to upload image to cloud storage',
          error: uploadError.message
        });
      }
    }

    const [update] = await pool.execute(
      'UPDATE categories SET name = ?, description = ?, image = COALESCE(?, image) WHERE id = ?',
      [name, description, imageUrl, id]
    );

    if (update.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Category not found' });

    res.status(200).json({ success: true, message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE Category
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
