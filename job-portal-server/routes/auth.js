const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController'); // Fixed import
const authenticateToken = require('../middleware/authMiddleware'); // Fixed middleware import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getProfile); // Removed duplicate route

module.exports = router;
