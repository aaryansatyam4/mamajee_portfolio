// backend/models/Blog.js
const mongoose = require('mongoose');

// Define the schema for a Blog post
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true // Full HTML content of the blog
    },
    imageUrl: {
        type: String, // URL of the image, typically from Cloudinary
        default: 'https://placehold.co/600x400/cccccc/000000?text=No+Image' // Default placeholder
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Category model
        ref: 'Category',
        required: false // Category is optional
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set creation timestamp
    }
});

module.exports = mongoose.model('Blog', BlogSchema); // Export the Blog model
