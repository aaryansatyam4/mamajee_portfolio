// backend/routes/blog.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Import the Blog model
const auth = require('../middleware/auth'); // Import the authentication middleware
const multer = require('multer'); // Middleware for handling multipart/form-data (file uploads)
const cloudinary = require('cloudinary').v2; // Cloudinary SDK
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Storage engine for Multer

// --- Cloudinary Configuration ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog_images', // Folder in Cloudinary where images will be stored
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed image formats
        // public_id: (req, file) => 'computed-filename-using-request-and-file', // Optional: customize public_id
    }
});

const parser = multer({ storage: storage }); // Create a multer instance with Cloudinary storage

// @route   GET /api/blogs
// @desc    Get all blogs (with optional search, category filter, and limit)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { q, limit, category } = req.query; // Destructure query parameters
        let query = {}; // Initialize an empty query object

        // If 'q' (search query) is provided, add title regex to query
        if (q) {
            query.title = { $regex: q, $options: 'i' }; // Case-insensitive search
        }
        // If 'category' ID is provided, add it to query
        if (category) {
            query.category = category;
        }

        // Find blogs based on query, sort by creation date (descending), and populate category details
        let blogs = await Blog.find(query)
            .sort({ createdAt: -1 }) // Sort by most recent first
            .populate('category', 'name'); // Populate only the 'name' field of the category

        // If 'limit' is provided, slice the array to return only that many blogs
        if (limit) {
            blogs = blogs.slice(0, parseInt(limit));
        }

        res.json(blogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching blogs');
    }
});

// @route   GET /api/blogs/:id
// @desc    Get a single blog by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        // Find blog by ID and populate category details
        const blog = await Blog.findById(req.params.id).populate('category', 'name');
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        // Check if the error is due to an invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Blog ID' });
        }
        res.status(500).send('Server Error fetching blog');
    }
});

// @route   POST /api/blogs
// @desc    Add a new blog
// @access  Private (Admin only)
// `parser.single('image')` handles the image upload to Cloudinary
router.post('/', auth, parser.single('image'), async (req, res) => {
    const { title, description, content, category, imageUrl } = req.body;
    let newImageUrl = imageUrl; // Default to provided imageUrl

    // If a file was uploaded via Multer/Cloudinary, use its URL
    if (req.file) {
        newImageUrl = req.file.path;
    }

    // Basic validation
    if (!title || !description || !content) {
        return res.status(400).json({ msg: 'Please enter all required fields: title, description, content' });
    }

    try {
        const newBlog = new Blog({
            title,
            description,
            content,
            imageUrl: newImageUrl,
            category: category || null // Set category to null if not provided
        });

        const blog = await newBlog.save(); // Save the new blog to the database
        res.status(201).json(blog); // Respond with the created blog
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error adding blog');
    }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private (Admin only)
// `parser.single('image')` handles potential new image upload
router.put('/:id', auth, parser.single('image'), async (req, res) => {
    const { title, description, content, category, imageUrl } = req.body;
    const blogFields = {}; // Object to hold fields to be updated

    // Add fields to blogFields if they are provided in the request body
    if (title) blogFields.title = title;
    if (description) blogFields.description = description;
    if (content) blogFields.content = content;
    if (category) blogFields.category = category;
    else if (category === '') blogFields.category = null; // Allow setting category to null

    // Handle image update logic:
    // If a new file is uploaded, use its Cloudinary URL
    if (req.file) {
        blogFields.imageUrl = req.file.path;
    }
    // If no new file, but an imageUrl is provided in the body, use that.
    // This allows updating the URL without re-uploading a file.
    else if (imageUrl !== undefined) { // Check for undefined to allow clearing imageUrl
        blogFields.imageUrl = imageUrl;
    }

    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }

        // Find the blog by ID and update it
        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: blogFields }, // Use $set to update specific fields
            { new: true, runValidators: true } // Return the updated document and run schema validators
        ).populate('category', 'name'); // Populate category after update

        res.json(blog); // Respond with the updated blog
    } catch (err) {
        console.error(err.message);
        // Check for invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Blog ID' });
        }
        res.status(500).send('Server Error updating blog');
    }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog by ID
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
    try {
        // Find the blog by ID and delete it
        const result = await Blog.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json({ msg: 'Blog removed successfully' });
    } catch (err) {
        console.error(err.message);
        // Check for invalid ObjectId format
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Blog ID' });
        }
        res.status(500).send('Server Error deleting blog');
    }
});

module.exports = router;
