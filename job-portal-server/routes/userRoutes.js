const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/Job');
const authenticateToken = require('../middleware/authMiddleware'); // JWT Middleware

// Save a Job (Protected Route)
router.post('/my-job', authenticateToken, async (req, res) => {
    const { job } = req.body;
    const userId = req.user.id; // Extracted from JWT token

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        console.log("🔹 User found:", user);

        // Check if the job exists
        let savedJob = await Job.findOne({ title: job.title, company: job.company });

        if (!savedJob) {
            savedJob = new Job(job);
            await savedJob.save();
            console.log("✅ Job saved:", savedJob);
        } else {
            console.log("⚠️ Job already exists:", savedJob);
        }

        // Check if the job is already in the user's savedJobs array
        if (!user.savedJobs.includes(savedJob._id)) {
            user.savedJobs.push(savedJob._id);
            await user.save();
            console.log("✅ Job added to user's savedJobs");
        } else {
            console.log("⚠️ Job already exists in user's savedJobs");
        }

        res.status(200).json({ message: 'Job saved successfully' });
    } catch (error) {
        console.error('❌ Error saving job:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get Saved Jobs for a User (Protected Route)
router.get('/my-job', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try {
        console.log("🔹 Fetching saved jobs for User ID:", userId);

        const user = await User.findById(userId).populate('savedJobs');

        if (!user) {
            console.log("❌ User not found in DB!");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("✅ Retrieved User:", user);
        console.log("✅ Saved Jobs:", user.savedJobs);

        res.status(200).json(user.savedJobs || []);
    } catch (error) {
        console.error('❌ Error fetching saved jobs:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
