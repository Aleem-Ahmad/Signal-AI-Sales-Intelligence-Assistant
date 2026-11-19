const express = require('express');
const cors = require('cors');

const analysisRoutes = require('./routes/analysisRoutes');
const historyRoutes = require('./routes/historyRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
}));

app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Sales Intelligence API is running',
  });
});

// API routes
app.use('/api/analysis', analysisRoutes);
app.use('/api/history', historyRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Centralized error handler (must remain last)
app.use(errorHandler);

module.exports = app;