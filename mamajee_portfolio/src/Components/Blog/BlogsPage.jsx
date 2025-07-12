import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchBlogs, fetchSingleBlog, fetchCategories } from '../../utils/api'; 

import './BlogsPage.css';

const BlogsPage = () => {
    
    const [localSelectedCategory, setLocalSelectedCategory] = useState('');

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams(); 
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const initialCategory = searchParams.get('category') || '';
        setLocalSelectedCategory(initialCategory);
    }, []); 
    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                // Optionally show an error message to the user
            }
        };
        getCategories();
    }, []);

    // Effect to fetch blogs based on localSelectedCategory
    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);
            try {
                const params = {};
                if (localSelectedCategory) params.category = localSelectedCategory;

                const data = await fetchBlogs(params);
                setBlogs(data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        getBlogs();
    }, [localSelectedCategory]); // Dependency is now only the localSelectedCategory

    // Effect to handle single blog view based on URL 'id' param
    useEffect(() => {
        const blogId = searchParams.get('id');
        if (blogId) {
            const getSingleBlog = async () => {
                setLoading(true);
                try {
                    const data = await fetchSingleBlog(blogId);
                    setSelectedBlog(data);
                } catch (err) {
                    console.error("Error fetching single blog:", err);
                    setSelectedBlog(null); // Clear selected blog on error
                    // Optionally show an error message to the user
                } finally {
                    setLoading(false);
                }
            };
            getSingleBlog();
        } else {
            setSelectedBlog(null);
        }
    }, [searchParams]); // This still depends on searchParams to detect URL changes for single blog view

    const blogContentRef = useRef(null);

    // Effect to scroll to blog content when a single blog is selected
    useEffect(() => {
        if (selectedBlog && blogContentRef.current) {
            blogContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedBlog]);

    // Handler for category select change (updates local state and URL immediately)
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setLocalSelectedCategory(newCategory); // Update local state for category
        
        // Update URL search params immediately for category change
        const newSearchParams = new URLSearchParams(searchParams);
        if (newCategory) {
            newSearchParams.set('category', newCategory);
        } else {
            newSearchParams.delete('category');
        }
        setSearchParams(newSearchParams);
    };

    if (loading) {
        return (
            <section className="blogs-page-container">
                <p className="loading-text">Loading blogs...</p>
            </section>
        );
    }

    if (selectedBlog) {
        return (
            <section className="blogs-page-container">
                <div className="single-blog-view-container" ref={blogContentRef}>
                    <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="single-blog-img" />
                    <h1 className="single-blog-title">{selectedBlog.title}</h1>
                    <p className="single-blog-meta">
                        Published on {new Date(selectedBlog.createdAt).toLocaleDateString()}
                        {selectedBlog.category && ` | Category: ${selectedBlog.category.name}`}
                    </p>
                    <div className="single-blog-content" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                    <button className="back-to-blogs-btn" onClick={() => setSearchParams({})}>
                        &larr; Back to all blogs
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="blogs-page-container">
            <h1 className="blogs-page-title">Our Latest Blogs</h1>
            <div className="controls-container">
                {/* Search input removed */}
                <select value={localSelectedCategory} onChange={handleCategoryChange} className="category-select">
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <div className="blog-grid-container">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog._id} className="blog-card">
                            <img src={blog.imageUrl} alt={blog.title} className="blog-card-img" />
                            <div className="blog-card-content">
                                <h3 className="blog-card-title">{blog.title}</h3>
                                <p className="blog-card-body">{blog.description.substring(0, 150)}...</p>
                                <Link to={`/blogs?id=${blog._id}`} className="read-more-link">Read More &rarr;</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-blogs-text">No blogs found matching your criteria.</p>
                )}
            </div>
        </section>
    );
};

export default BlogsPage;
