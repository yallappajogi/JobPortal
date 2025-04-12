const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]  // Add this line

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
