const express = require('express');
const router = express.Router();

// @route   GET /api/cron/check
// @desc    Returns true for cron job check
// @access  Public
router.get('/check', (req, res) => {
    res.json({ success: true });
});

module.exports = router;
