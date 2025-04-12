import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import profileRoute from './routes/profile.js';
import userRoutes from './routes/userRoutes.js';
import postedJob from './routes/postJob.js';


// Initialize app
const app = express(); 

// Middleware
app.use(express.json());

// Improved CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoute);
app.use('/api', postedJob); // ✅ Fixed issue

// Default Route
app.get('/', (req, res) => {
  res.send('Backend Server is Running Successfully!');
});

// MongoDB Connection
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.lelxqhq.mongodb.net/mern_job_portal?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1); // Exit process if DB connection fails
  });

