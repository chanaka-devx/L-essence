const pool = require('../config/db');

class Category {
  constructor(id, title, description, image) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
  }

  // Get all categories
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT id, title, description, image FROM categories ORDER BY id ASC'
      );
      return rows.map(row => new Category(row.id, row.title, row.description, row.image));
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  // Get category by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, title, description, image FROM categories WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      const row = rows[0];
      return new Category(row.id, row.title, row.description, row.image);
    } catch (error) {
      throw new Error(`Error fetching category: ${error.message}`);
    }
  }

  // Create new category
  async save() {
    try {
      const [result] = await pool.execute(
        'INSERT INTO categories (title, description, image) VALUES (?, ?, ?)',
        [this.title, this.description, this.image]
      );
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating category: ${error.message}`);
    }
  }

  // Update category
  async update() {
    try {
      const [result] = await pool.execute(
        'UPDATE categories SET title = ?, description = ?, image = ? WHERE id = ?',
        [this.title, this.description, this.image, this.id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Category not found');
      }
      
      return this;
    } catch (error) {
      throw new Error(`Error updating category: ${error.message}`);
    }
  }

  // Delete category
  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM categories WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Category not found');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error deleting category: ${error.message}`);
    }
  }
}

module.exports = Category;
