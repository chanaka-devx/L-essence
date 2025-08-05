const pool = require('../config/db');

class Dish {
  constructor(id, name, price, dish_image, category_id) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.dish_image = dish_image;
    this.category_id = category_id;
  }

  // Get all dishes
  static async findAll() {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, price, dish_image, category_id FROM dishes ORDER BY id ASC'
      );
      return rows.map(row => new Dish(row.id, row.name, row.price, row.dish_image, row.category_id));
    } catch (error) {
      throw new Error(`Error fetching dishes: ${error.message}`);
    }
  }

  // Get dishes by category ID
  static async findByCategoryId(categoryId) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, price, dish_image, category_id FROM dishes WHERE category_id = ? ORDER BY id ASC',
        [categoryId]
      );
      return rows.map(row => new Dish(row.id, row.name, row.price, row.dish_image, row.category_id));
    } catch (error) {
      throw new Error(`Error fetching dishes for category: ${error.message}`);
    }
  }

  // Get dish by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, price, dish_image, category_id FROM dishes WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) {
        return null;
      }
      
      const row = rows[0];
      return new Dish(row.id, row.name, row.price, row.dish_image, row.category_id);
    } catch (error) {
      throw new Error(`Error fetching dish: ${error.message}`);
    }
  }

  // Create new dish
  async save() {
    try {
      const [result] = await pool.execute(
        'INSERT INTO dishes (name, price, dish_image, category_id) VALUES (?, ?, ?, ?)',
        [this.name, this.price, this.dish_image, this.category_id]
      );
      this.id = result.insertId;
      return this;
    } catch (error) {
      throw new Error(`Error creating dish: ${error.message}`);
    }
  }

  // Update dish
  async update() {
    try {
      const [result] = await pool.execute(
        'UPDATE dishes SET name = ?, price = ?, dish_image = ?, category_id = ? WHERE id = ?',
        [this.name, this.price, this.dish_image, this.category_id, this.id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Dish not found');
      }
      
      return this;
    } catch (error) {
      throw new Error(`Error updating dish: ${error.message}`);
    }
  }

  // Delete dish
  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM dishes WHERE id = ?',
        [id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Dish not found');
      }
      
      return true;
    } catch (error) {
      throw new Error(`Error deleting dish: ${error.message}`);
    }
  }

  // Get dishes count by category
  static async getCountByCategory(categoryId) {
    try {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM dishes WHERE category_id = ?',
        [categoryId]
      );
      return rows[0].count;
    } catch (error) {
      throw new Error(`Error counting dishes: ${error.message}`);
    }
  }
}

module.exports = Dish;
