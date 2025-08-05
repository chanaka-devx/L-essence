const Category = require('../models/Category');

class CategoryController {
  // GET /api/categories - Get all categories
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({
        success: true,
        message: 'Categories fetched successfully',
        data: categories
      });
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      });
    }
  }

  // GET /api/categories/:id - Get category by ID
  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      
      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category ID'
        });
      }

      const category = await Category.findById(parseInt(id));
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Category retrieved successfully',
        data: category
      });
    } catch (error) {
      console.error('Error in getCategoryById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve category',
        error: error.message
      });
    }
  }

  // POST /api/categories - Create new category
  static async createCategory(req, res) {
    try {
      const { title, description, image } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Title and description are required'
        });
      }

      const category = new Category(null, title, description, image);
      const savedCategory = await category.save();

      res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: savedCategory
      });
    } catch (error) {
      console.error('Error in createCategory:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create category',
        error: error.message
      });
    }
  }

  // PUT /api/categories/:id - Update category
  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { title, description, image } = req.body;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category ID'
        });
      }

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: 'Title and description are required'
        });
      }

      // Check if category exists
      const existingCategory = await Category.findById(parseInt(id));
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      // Update category
      existingCategory.title = title;
      existingCategory.description = description;
      existingCategory.image = image;
      
      const updatedCategory = await existingCategory.update();

      res.status(200).json({
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory
      });
    } catch (error) {
      console.error('Error in updateCategory:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update category',
        error: error.message
      });
    }
  }

  // DELETE /api/categories/:id - Delete category
  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      // Validate ID
      if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category ID'
        });
      }

      // Check if category exists
      const existingCategory = await Category.findById(parseInt(id));
      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }

      await Category.delete(parseInt(id));

      res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteCategory:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete category',
        error: error.message
      });
    }
  }
}

module.exports = CategoryController;
