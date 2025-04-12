const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/authMiddleware');

// Create or Update Profile
router.post('/profile', authMiddleware, async (req, res) => {
    const { bio, location, skills } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile = { bio, location, skills };
        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', profile: user.profile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
