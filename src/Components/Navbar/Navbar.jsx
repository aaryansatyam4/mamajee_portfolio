import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const closeNavbar = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  return (
    <header>
      <div className="logo">
        <span><h1>ASHISH SINHA</h1></span>
      </div>
      <nav ref={navRef}>
        <div className="nav-item">
          <a href="#aboutme" onClick={closeNavbar}>About me</a>
        </div>
        <div className="nav-item">
          <a href="#cg" onClick={closeNavbar}>Career Graph</a>
        </div>
        <div className="nav-item">
          <a href="#ch" onClick={closeNavbar}>Career Highlights</a>
        </div>
        <div className="nav-item">
          <a href="#project" onClick={closeNavbar}>Projects</a>
        </div>
        <div className="nav-item">
          <a href="#crtfct" onClick={closeNavbar}>Certifications</a>
        </div>
        <div className="nav-item">
          <a href="#" onClick={closeNavbar}>Contact me</a>
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
