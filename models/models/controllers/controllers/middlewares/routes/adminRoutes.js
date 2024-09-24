const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { apiKeyMiddleware } = require('../middlewares/apiKeyMiddleware');

router.post('/train', apiKeyMiddleware, adminController.addTrain);

module.exports = router;
