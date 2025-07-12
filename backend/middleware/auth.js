// backend/middleware/auth.js
// This middleware checks for a hardcoded token for authentication.
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token is provided
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Check if the provided token matches the hardcoded token
    if (token !== 'fake-token-for-client') {
        return res.status(401).json({ msg: 'Token is not valid' });
    }

    // If token is valid (matches hardcoded value), proceed to the next middleware/route handler
    next();
};
