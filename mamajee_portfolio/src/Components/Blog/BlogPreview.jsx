import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../utils/api'; // Import the API function
import './Blog.css';

const BlogPreview = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                // Fetch only the latest 3 blogs using the API function
                const data = await fetchBlogs({ limit: 3 });
                setBlogs(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    if (loading) {
        return <section className="blog-section"><p className="loading-text">Loading blogs...</p></section>;
    }

    return (
        <section className="blog-section" id="blogs">
            <h2 className="blog-title">Latest Blogs</h2>
            <div className="blog-container">
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
                    <p className="no-blogs-text">No blogs to display yet.</p>
                )}
            </div>
            {blogs.length > 0 && (
                <div className="view-all-container">
                    <Link to="/blogs" className="view-all-link">View All Blogs</Link>
                </div>
            )}
        </section>
    );
};

export default BlogPreview;
