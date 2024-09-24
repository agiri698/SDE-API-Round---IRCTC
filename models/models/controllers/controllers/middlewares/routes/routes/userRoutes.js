const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/seat-availability', authenticateJWT, userController.getSeatAvailability);
router.post('/book-seat', authenticateJWT, userController.bookSeat);

module.exports = router;
