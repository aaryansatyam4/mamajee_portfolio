import React, { useState, useEffect } from 'react';
import {
    loginAdmin,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    fetchCategories,
    createCategory
} from '../../utils/api'; // Ensure this path is correct relative to your project structure

// Lucide React Icons (make sure you have lucide-react installed: npm install lucide-react)
import { LogIn, LogOut, PlusCircle, Edit, Trash2, XCircle, CheckCircle, Info } from 'lucide-react';

// Import the new CSS file
import './BlogAdmin.css';

// Custom Modal Component to replace alert/confirm
const ConfirmationModal = ({ isOpen, title, message, onConfirm, onClose, isConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="flex justify-center mb-4">
                    {isConfirm ? (
                        <Info className="lucide-icon info" />
                    ) : (
                        <CheckCircle className="lucide-icon check" />
                    )}
                </div>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-buttons">
                    {isConfirm && (
                        <button
                            onClick={onConfirm}
                            className="btn-danger"
                        >
                            <CheckCircle className="lucide-icon small mr-2" /> Confirm
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={isConfirm ? 'btn-secondary' : 'btn-primary'}
                    >
                        <XCircle className="lucide-icon small mr-2" /> {isConfirm ? 'Cancel' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const BlogAdmin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', description: '', content: '', imageUrl: '', category: '' });
    const [newCategory, setNewCategory] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    // Modal state
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onClose: null,
        isConfirm: false,
    });

    // Function to show alert modal
    const showAlert = (title, message) => {
        setModal({
            isOpen: true,
            title,
            message,
            onConfirm: null,
            onClose: () => setModal({ ...modal, isOpen: false }),
            isConfirm: false,
        });
    };

    // Function to show confirmation modal
    const showConfirm = (title, message, onConfirmCallback) => {
        setModal({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                onConfirmCallback();
                setModal({ ...modal, isOpen: false });
            },
            onClose: () => setModal({ ...modal, isOpen: false }),
            isConfirm: true,
        });
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        if (token === 'fake-token-for-client') { // Check for the specific hardcoded token
            setIsLoggedIn(true);
            loadAdminData();
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const loadAdminData = async () => {
        await getBlogs();
        await getCategories();
    };

    const handleLoginChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await loginAdmin(loginForm.username, loginForm.password);
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            loadAdminData();
        } catch (err) {
            showAlert('Login Failed', err.message || 'Please check your credentials.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setLoginForm({ username: '', password: '' });
        showAlert('Logged Out', 'You have been successfully logged out.');
    };
    
    const getBlogs = async () => {
        try {
            const data = await fetchBlogs();
            setBlogs(data);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            showAlert('Error', 'Failed to fetch blogs.');
        }
    };

    const getCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            showAlert('Error', 'Failed to fetch categories.');
        }
    };

    const handleBlogChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newBlog.title);
        formData.append('description', newBlog.description);
        formData.append('content', newBlog.content);
        formData.append('category', newBlog.category);
        if (imageFile) {
            formData.append('image', imageFile);
        } else if (newBlog.imageUrl) { // Only append imageUrl if no new file and imageUrl exists
            formData.append('imageUrl', newBlog.imageUrl);
        }

        try {
            if (editMode) {
                await updateBlog(currentBlogId, formData);
                showAlert('Success', 'Blog updated successfully!');
            } else {
                await createBlog(formData);
                showAlert('Success', 'Blog added successfully!');
            }
            
            resetForm();
            getBlogs(); // Refresh blog list
        } catch (err) {
            console.error("Error submitting blog:", err.response ? err.response.data : err.message);
            showAlert('Error', 'Failed to submit blog. Check console for details.');
        }
    };

    const handleEdit = (blog) => {
        setEditMode(true);
        setCurrentBlogId(blog._id);
        setNewBlog({
            title: blog.title,
            description: blog.description,
            content: blog.content,
            imageUrl: blog.imageUrl,
            category: blog.category?._id || '' // Handle case where category might be null
        });
        setImageFile(null); // Clear any previously selected file when editing
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for easier editing
    };

    const handleDelete = (id) => {
        showConfirm("Confirm Delete", "Are you sure you want to delete this blog?", async () => {
            try {
                await deleteBlog(id);
                showAlert('Success', 'Blog deleted successfully!');
                getBlogs(); // Refresh blog list
            } catch (err) {
                console.error("Error deleting blog:", err);
                showAlert('Error', 'Failed to delete blog.');
            }
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setCurrentBlogId(null);
        setNewBlog({ title: '', description: '', content: '', imageUrl: '', category: '' });
        setImageFile(null);
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(newCategory);
            showAlert('Success', 'Category added!');
            setNewCategory('');
            getCategories(); // Refresh category list
        } catch (err) {
            console.error("Error adding category:", err.response ? err.response.data : err.message);
            showAlert('Error', err.response?.data?.msg || 'Failed to add category. Category might already exist or another error occurred.');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-page flex items-center justify-center">
                <ConfirmationModal {...modal} />
                <div className="admin-login-card">
                    <h2 className="admin-title">
                        <LogIn className="lucide-icon blue" /> Admin Login
                    </h2>
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={loginForm.username}
                                onChange={handleLoginChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary mt-6">
                            <LogIn className="lucide-icon small mr-2" /> Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <ConfirmationModal {...modal} />
            <div className="admin-dashboard-card">
                <div className="admin-title-dashboard">
                    <h2 className="flex items-center">
                        Admin Dashboard
                    </h2>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut className="lucide-icon small mr-2" /> Logout
                    </button>
                </div>
                
                <div className="admin-grid">
                    {/* Add/Edit Blog Section */}
                    <div className="admin-section-card">
                        <h3 className="section-title">
                            <PlusCircle className="lucide-icon blue" /> {editMode ? 'Edit Blog' : 'Add New Blog'}
                        </h3>
                        <form className="blog-form" onSubmit={handleBlogSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Blog Title"
                                value={newBlog.title}
                                onChange={handleBlogChange}
                                className="form-input"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Short Description"
                                value={newBlog.description}
                                onChange={handleBlogChange}
                                rows="3"
                                className="form-input"
                                required
                            ></textarea>
                            <textarea
                                name="content"
                                placeholder="Full Blog Content (Supports HTML)"
                                value={newBlog.content}
                                onChange={handleBlogChange}
                                rows="8"
                                className="form-input"
                                required
                            ></textarea>
                            <div className="space-y-2">
                                <label className="block text-gray-700 text-sm font-medium">Image Options:</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="file-input"
                                />
                                {editMode && newBlog.imageUrl && (
                                    <p className="help-text">
                                        Current Image: <a href={newBlog.imageUrl} target="_blank" rel="noopener noreferrer">{newBlog.imageUrl}</a>
                                    </p>
                                )}
                                {editMode && <p className="help-text small">Leave file input blank to keep existing image. Uploading a new file will replace it.</p>}
                                
                                <input
                                    type="text"
                                    name="imageUrl"
                                    placeholder="Or enter image URL (used if no file uploaded)"
                                    value={newBlog.imageUrl}
                                    onChange={handleBlogChange}
                                    className="form-input"
                                />
                            </div>
                            <select
                                name="category"
                                value={newBlog.category}
                                onChange={handleBlogChange}
                                className="form-input"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            <div className="flex space-x-4 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editMode ? <><Edit className="lucide-icon small mr-2" /> Update Blog</> : <><PlusCircle className="lucide-icon small mr-2" /> Add Blog</>}
                                </button>
                                {editMode && (
                                    <button type="button" onClick={resetForm} className="btn-secondary flex-1">
                                        <XCircle className="lucide-icon small mr-2" /> Cancel Edit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Manage Categories Section */}
                    <div className="admin-section-card">
                        <h3 className="section-title">
                            <PlusCircle className="lucide-icon green" /> Manage Categories
                        </h3>
                        <form className="category-form" onSubmit={handleCategorySubmit}>
                            <input
                                type="text"
                                placeholder="New Category Name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="form-input"
                                required
                            />
                            <button type="submit" className="btn-primary w-auto whitespace-nowrap">
                                <PlusCircle className="lucide-icon small mr-2" /> Add
                            </button>
                        </form>
                        <h4 className="text-lg font-medium text-gray-700 mb-3">Existing Categories:</h4>
                        <ul className="category-list">
                            {categories.length > 0 ? (
                                categories.map(cat => (
                                    <li key={cat._id}>
                                        {cat.name}
                                        {/* Optional: Add delete category button here too */}
                                        {/* <button onClick={() => handleDeleteCategory(cat._id)} className="btn-danger ml-4">
                                            <Trash2 className="lucide-icon extra-small" />
                                        </button> */}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">No categories added yet.</p>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Existing Blogs Section */}
                <div className="admin-section-card">
                    <h3 className="section-title">Existing Blogs</h3>
                    <ul className="blog-list">
                        {blogs.length > 0 ? (
                            blogs.map(blog => (
                                <li key={blog._id} className="blog-item">
                                    <h4>{blog.title}</h4>
                                    <div className="blog-actions">
                                        <button onClick={() => handleEdit(blog)} className="btn-secondary px-3 py-1.5 text-sm">
                                            <Edit className="lucide-icon extra-small mr-1.5" /> Edit
                                        </button>
                                        <button onClick={() => handleDelete(blog._id)} className="btn-danger px-3 py-1.5 text-sm">
                                            <Trash2 className="lucide-icon extra-small mr-1.5" /> Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No blogs created yet. Start by adding a new one above!</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
