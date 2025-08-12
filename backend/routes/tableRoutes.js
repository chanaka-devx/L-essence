const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const tableController = require("../controllers/tableController");

router.get("/available", tableController.getAvailableTables);

// Routes
router.get('/', tableController.getAllTables);
router.post('/', upload.single('table_image'), tableController.createTable);
router.put('/:id', upload.single('table_image'), tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

module.exports = router;
