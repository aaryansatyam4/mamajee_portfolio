import React, { useEffect } from "react";
import Typed from "typed.js"; // For typing animation
import "./Hero.css"; // Import custom CSS
import personImage from "../Assets/mama3.jpg"; // Image path

const Hero = () => {
  useEffect(() => {
    // Initialize Typed.js animation for the typing effect
    const typed = new Typed(".typing", {
      strings: ["LnD & OD Specialist", "Sales Capability Manager", "HR Business Partner", "Talent Manager","P&L Leader ","Employee Engagement Champion","Partner Workforce Management ","Raconteur"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    return () => {
      // Destroy Typed instance on unmount to prevent memory leaks
      typed.destroy();
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="max-width">
        <div className="hero-content">
          <div className="left-section">
            <div className="text-1">Greetings, I am</div>
            <div className="text-2">Ashish Sinha</div>
            <div className="text-3">
              And I'm a <span className="typing"></span>
            </div>
            <a href="#contact">Contact me</a>
          </div>
          <div className="right-section">
            <img src={personImage} alt="Aryan Satyam" className="person-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
