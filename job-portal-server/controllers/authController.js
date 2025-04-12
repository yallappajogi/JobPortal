const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register User
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Return userId after successful registration
        res.status(201).json({ userId: newUser._id, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        // Make sure to include the user object in the response
        res.json({
            token,
            user: { 
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};


// Get Profile (Protected Route)
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile data.' });
    }
};

module.exports = { registerUser, loginUser, getProfile };
