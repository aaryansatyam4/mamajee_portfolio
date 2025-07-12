// backend/models/Category.js
const mongoose = require('mongoose');

// Define the schema for a Category
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Category names must be unique
        trim: true // Remove whitespace from both ends of a string
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set creation timestamp
    }
});

module.exports = mongoose.model('Category', CategorySchema); // Export the Category model
