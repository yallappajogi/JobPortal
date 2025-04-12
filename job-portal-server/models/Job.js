const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  salary: String,
  date: { type: Date, required: true, default: Date.now },
  experienceType: String,
  description: String,
  skills: [String],
  postedBy: String,
});

module.exports = mongoose.model("Job", jobSchema);
