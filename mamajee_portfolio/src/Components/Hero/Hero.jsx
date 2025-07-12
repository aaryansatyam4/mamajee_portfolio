import React, { useEffect } from "react";
import Typed from "typed.js";
import "./Hero.css";
import personImage from "../Assets/mama3.jpg";

const Hero = () => {
  useEffect(() => {
    const typed = new Typed(".typing", {
      strings: ["HR Specialist", "LnD Enthusiast", "Sales Operations Expert"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });

    return () => {
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
            <a href="mailto:sn.ashish@gmail.com" className="email-button">Email Me</a>
          </div>
          <div className="right-section">
            <img src={personImage} alt="Ashish Sinha" className="person-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
