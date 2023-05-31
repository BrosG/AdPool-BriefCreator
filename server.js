// Import necessary modules
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const briefRoutes = require('./routes/briefRoutes');

// Initialize express
const app = express();

// Middleware for parsing JSON bodies and URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for Cross-origin resource sharing
app.use(cors());

// Use routes
app.use('/createBrief', briefRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
