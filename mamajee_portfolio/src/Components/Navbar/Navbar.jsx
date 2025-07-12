import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link, useLocation, useNavigate
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const handleNavLinkClick = (e, hash) => {
    e.preventDefault();
    closeNavbar();

    if (location.pathname !== '/') {
      // If not on the home page, navigate to home and then scroll
      navigate('/', { state: { scrollTo: hash } });
    } else {
      // If already on the home page, just scroll
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Effect to scroll when navigating from another page to home with a hash
  React.useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const hash = location.state.scrollTo;
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Use a timeout to ensure the element is rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
      }
      // Clear the state so it doesn't scroll again on subsequent home page visits
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);


  return (
    <header>
      <div className="logo">
        <span><h1>ASHISH SINHA</h1></span>
      </div>
      <nav ref={navRef}>
        <div className="nav-item">
          <a href="#aboutme" onClick={(e) => handleNavLinkClick(e, '#aboutme')}>About me</a>
        </div>
        <div className="nav-item">
          <a href="#cg" onClick={(e) => handleNavLinkClick(e, '#cg')}>Career Graph</a>
        </div>
        <div className="nav-item">
          <a href="#ch" onClick={(e) => handleNavLinkClick(e, '#ch')}>Career Highlights</a>
        </div>
        <div className="nav-item">
          <a href="#project" onClick={(e) => handleNavLinkClick(e, '#project')}>Projects</a>
        </div>
        <div className="nav-item">
          <a href="#crtfct" onClick={(e) => handleNavLinkClick(e, '#crtfct')}>Certifications</a>
        </div>
        <div className="nav-item">
          <Link to="/blogs" onClick={closeNavbar}>All Blogs</Link>
        </div>
      
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
