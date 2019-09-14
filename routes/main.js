const path = require('path');

const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

// GET
router.get('/', mainController.getIndex);
// POST
router.post('/add_schedule', mainController.postSchedule);

module.exports = router;
