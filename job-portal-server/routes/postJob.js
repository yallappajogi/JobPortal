import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// ✅ Store user-posted job
router.post("/posted-Jobs", async (req, res) => {
  try {
    console.log("Received job data:", req.body); 
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job successfully posted!", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Error posting job" });
  }
});

// ✅ Fetch all posted jobs from MongoDB
router.get("/posted-Jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

export default router;
