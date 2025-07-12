// backend/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors'); // No longer importing the 'cors' package

const app = express();
// Change the port to 5001 to avoid conflict with AirTunes on macOS
const PORT = process.env.PORT || 5001;

// --- Middleware ---

// Pure Custom CORS Handling (MUST BE FIRST)
// This middleware will set all necessary CORS headers for every request.
// It explicitly handles OPTIONS preflight requests by sending a 200 OK.
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`); // Log all incoming requests

    // Set Access-Control-Allow-Origin to allow requests from any origin
    // In a production environment, replace '*' with your frontend's actual origin (e.g., 'http://localhost:3000')
    res.header('Access-Control-Allow-Origin', '*');
    // Set allowed HTTP methods for CORS requests
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    // Set allowed headers for CORS requests, including Content-Type and Authorization
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
    // Allow credentials (like cookies or HTTP authentication) to be sent with the request
    res.header('Access-Control-Allow-Credentials', 'true');

    // If the request is an OPTIONS preflight request, send a 200 OK response and end the request.
    // This is crucial for preflight checks to succeed.
    if (req.method === 'OPTIONS') {
        console.log('Responding to OPTIONS preflight request with 200 OK.');
        return res.sendStatus(200);
    }

    // For all other requests (GET, POST, etc.), pass control to the next middleware.
    next();
});

// Parse incoming JSON requests
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// --- Import Routes ---
const blogRoutes = require('./routes/blog');
const categoryRoutes = require('./routes/category');
const authRoutes = require('./routes/auth');

// --- Use Routes ---
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes); // Ensure this route is correctly defined and handled

// --- Root Route for API Status Check ---
app.get('/', (req, res) => res.send('Blog API is running...'));

// --- Start Server ---
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
