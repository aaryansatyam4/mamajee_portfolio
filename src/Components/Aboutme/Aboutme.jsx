import React, { useEffect, useRef } from 'react';
import './Aboutme.css';
import mamapic from '../Assets/mama2.jpeg'; // Ensure the image path is correct

const Aboutme = () => {
  const imageRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Stop observing once in view (animate only once)
          }
        });
      },
      { threshold: 0.5 }
    );

    if (imageRef.current) observer.observe(imageRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <section className="aboutme-section" id="aboutme">
      <h2 className="aboutme-title">About Me</h2>
      <div className="aboutme-container">
        <div className="aboutme-left" ref={imageRef}>
          <img 
            src={mamapic}
            alt="Ashish Sinha" 
            className="aboutme-img" 
          />
        </div>
        <div className="aboutme-right" ref={contentRef}>
          <p>
            I am Ashish Sinha, a Vi National Award Winner in 2024, with a deep passion for driving impactful HR initiatives. With over two decades of experience, I specialize in Learning & Development, Organizational Development, and HR Business Partnership. Throughout my career, I've led transformational projects like Project Atmanirbhar and have been instrumental in shaping talent strategies, building organizational culture, and improving employee engagement. My expertise spans across workforce management, vendor partnerships, and the development of tailored training programs that drive real business outcomes. I'm also a strong advocate for people-centric leadership, and I thrive on creating meaningful learning experiences that help both individuals and organizations grow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
