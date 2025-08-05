const Dish = require('../models/dish');
const Category = require('../models/Category');

class DishController {
  // GET /api/dishes - Get all dishes
  static async getAllDishes(req, res) {
    try {
      const dishes = await Dish.findAll();
      res.status(200).json({
        success: true,
        message: 'Dishes retrieved successfully',
        data: dishes
      });
    } catch (error) {
      console.error('Error in getAllDishes:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve dishes',
        error: error.message
      });
    }
  }

  // GET /api/dishes/:id - Get dish by ID
  static async getDishById(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid dish ID'
        });
      }

      const dish = await Dish.findById(parseInt(id));
      
      if (!dish) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Dish retrieved successfully',
        data: dish
      });
    } catch (error) {
      console.error('Error in getDishById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve dish',
        error: error.message
      });
    }
  }

  // POST /api/dishes - Create new dish
  static async createDish(req, res) {
    try {
      const { name, price, image, category_id } = req.body;

      // Validate required fields
      if (!name || !price || !category_id) {
        return res.status(400).json({
          success: false,
          message: 'Name, price, and category_id are required'
        });
      }

      // Validate price is a number
      if (isNaN(parseFloat(price))) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a valid number'
        });
      }

      // Check if category exists
      const category = await Category.findById(parseInt(category_id));
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      const dish = new Dish(null, name, parseFloat(price), image, parseInt(category_id));
      const savedDish = await dish.save();

      res.status(201).json({
        success: true,
        message: 'Dish created successfully',
        data: savedDish
      });
    } catch (error) {
      console.error('Error in createDish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create dish',
        error: error.message
      });
    }
  }

  // PUT /api/dishes/:id - Update dish
  static async updateDish(req, res) {
    try {
      const { id } = req.params;
      const { name, price, image, category_id } = req.body;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid dish ID'
        });
      }

      // Validate required fields
      if (!name || !price || !category_id) {
        return res.status(400).json({
          success: false,
          message: 'Name, price, and category_id are required'
        });
      }

      // Validate price is a number
      if (isNaN(parseFloat(price))) {
        return res.status(400).json({
          success: false,
          message: 'Price must be a valid number'
        });
      }

      // Check if dish exists
      const existingDish = await Dish.findById(parseInt(id));
      if (!existingDish) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }

      // Check if category exists
      const category = await Category.findById(parseInt(category_id));
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      // Update dish
      existingDish.name = name;
      existingDish.price = parseFloat(price);
      existingDish.image = image;
      existingDish.category_id = parseInt(category_id);
      
      const updatedDish = await existingDish.update();

      res.status(200).json({
        success: true,
        message: 'Dish updated successfully',
        data: updatedDish
      });
    } catch (error) {
      console.error('Error in updateDish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update dish',
        error: error.message
      });
    }
  }

  // DELETE /api/dishes/:id - Delete dish
  static async deleteDish(req, res) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid dish ID'
        });
      }

      // Check if dish exists
      const existingDish = await Dish.findById(parseInt(id));
      if (!existingDish) {
        return res.status(404).json({
          success: false,
          message: 'Dish not found'
        });
      }

      await Dish.delete(parseInt(id));

      res.status(200).json({
        success: true,
        message: 'Dish deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteDish:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete dish',
        error: error.message
      });
    }
  }
}

module.exports = DishController;
