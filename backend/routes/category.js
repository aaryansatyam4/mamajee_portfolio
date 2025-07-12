// backend/routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category'); // Import the Category model
const auth = require('../middleware/auth'); // Import the authentication middleware

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public (anyone can view categories)
router.get('/', async (req, res) => {
    try {
        // Find all categories and sort them alphabetically by name
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching categories');
    }
});

// @route   POST /api/categories
// @desc    Add a new category
// @access  Private (Admin only)
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    // Basic validation
    if (!name) {
        return res.status(400).json({ msg: 'Category name is required' });
    }

    try {
        // Check if a category with the same name already exists
        let category = await Category.findOne({ name: name.trim() });
        if (category) {
            return res.status(400).json({ msg: 'Category already exists' });
        }

        // Create a new category instance
        category = new Category({ name: name.trim() });
        // Save the new category to the database
        await category.save();
        res.status(201).json(category); // Respond with the created category
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error adding category');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        // Find the category by ID and delete it
        const result = await Category.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json({ msg: 'Category removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error deleting category');
    }
});

module.exports = router;
