const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const CategoryController = require('../controllers/categoryController');

// GET /api/categories - Get all categories
router.get('/', CategoryController.getAllCategories);

// GET /api/categories/:id/dishes - Get dishes by category ID
//router.get('/:id/dishes', CategoryController.getDishesByCategory);

// GET /api/categories/:id - Get category by ID
router.get('/:id', CategoryController.getCategoryById);

// POST /api/categories - Create new category
router.post('/', upload.single('image'), CategoryController.createCategory);

// PUT /api/categories/:id - Update category
router.put('/:id', upload.single('image'), CategoryController.updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
