const express = require('express');
const AdminController = require('../controllers/adminController');
const validateUsername = require('../middleware/validateUsername');

const router = express.Router();

router.post('/signup', validateUsername, AdminController.signup);

router.post('/login', validateUsername, AdminController.login);

module.exports = router;

