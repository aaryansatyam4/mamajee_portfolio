import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:5001/api';

// Function to get the authentication token (for admin actions)
const getToken = () => localStorage.getItem('token');

// --- Blog API Calls ---
export const fetchBlogs = async (params = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
        throw error; // Re-throw to be handled by the component
    }
};

export const fetchSingleBlog = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createBlog = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': getToken() // Include token for authenticated routes
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating blog:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateBlog = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': getToken()
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating blog with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteBlog = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
            headers: {
                'x-auth-token': getToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting blog with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

// --- Category API Calls ---
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createCategory = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories`, { name }, {
            headers: {
                'x-auth-token': getToken()
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// --- Auth API Calls ---
export const loginAdmin = async (username, password) => {
    try {
        // This will now make an actual POST request to your backend's login endpoint
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        return response.data.token; // Expecting a 'token' field in the response
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        // Throw a more user-friendly error message
        throw error.response ? new Error(error.response.data.msg || 'Login failed') : new Error('Network Error: Could not connect to server.');
    }
};
