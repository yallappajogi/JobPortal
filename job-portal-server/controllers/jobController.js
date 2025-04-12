const Job = require('./models/job'); // Assuming you have a Job model

// Save Job for a User
const saveJob = async (req, res) => {
    const { title, company, location, description } = req.body;
    const userID = req.user.id; // Extracting user ID from the token

    try {
        const newJob = new Job({
            title,
            company,
            location,
            description,
            userID
        });

        await newJob.save();
        res.status(201).json({ message: 'Job saved successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save job' });
    }
};

// Get Saved Jobs for Logged-in User
const getUserJobs = async (req, res) => {
    const userID = req.user.id; // Extracting user ID from the token

    try {
        const jobs = await Job.find({ userID });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch saved jobs' });
    }
};

module.exports = { saveJob, getUserJobs };
