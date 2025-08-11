const express = require('express');
const UserController = require('../controllers/userController');
const validateUsername = require('../middleware/validateEmail');

const router = express.Router();

router.post('/signup', validateUsername, UserController.signup);

router.post('/login', validateUsername, UserController.login);

module.exports = router;