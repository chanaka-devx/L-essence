const express = require('express');
const router = express.Router();
const DishController = require('../controllers/dishController');

// GET /api/dishes - Get all dishes
router.get('/', DishController.getAllDishes);

// GET /api/dishes/:id - Get dish by ID
router.get('/:id', DishController.getDishById);

// POST /api/dishes - Create new dish
router.post('/', DishController.createDish);

// PUT /api/dishes/:id - Update dish
router.put('/:id', DishController.updateDish);

// DELETE /api/dishes/:id - Delete dish
router.delete('/:id', DishController.deleteDish);

module.exports = router;