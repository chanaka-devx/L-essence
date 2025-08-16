const express = require('express');
const UserController = require('../controllers/userController');
const validateUsername = require('../middleware/validateEmail');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', validateUsername, UserController.signup);

router.post('/login', validateUsername, UserController.login);

router.get('/me', auth, UserController.getProfile);
router.put('/me', auth, UserController.updateProfile);

module.exports = router;