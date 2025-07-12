// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Hardcoded credentials for the admin user
const hardcodedAdmin = {
    username: 'mama',
    // Hardcoded, plain-text password (no hashing)
    password: '1234'
};

// @route   POST /api/auth/login
// @desc    Authenticate user with hardcoded credentials
// @access  Public
router.post('/login', (req, res) => {
    console.log('Received login request:', req.body); // Log incoming request body
    const { username, password } = req.body;

    try {
        // Basic validation for request body
        if (!username || !password) {
            console.log('Login attempt failed: Missing username or password');
            return res.status(400).json({ msg: 'Please enter username and password' });
        }

        // Check if username and password match the hardcoded credentials
        if (username === hardcodedAdmin.username && password === hardcodedAdmin.password) {
            // If credentials are valid, send back a success message and the hardcoded token
            console.log(`User '${username}' logged in successfully. Sending 'fake-token-for-client'.`);
            return res.json({ msg: 'Login successful', token: 'fake-token-for-client' });
        } else {
            // If credentials do not match
            console.log(`Login attempt failed for user '${username}': Invalid credentials`);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

    } catch (err) {
        console.error('Server error during login:', err.message);
        res.status(500).send('Server error during login');
    }
});

module.exports = router;