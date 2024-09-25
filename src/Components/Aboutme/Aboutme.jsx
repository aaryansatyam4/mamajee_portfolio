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
          Embracing Growth: The Journey of a Lifelong Learner

In today's fast-paced world, staying within one's comfort zone is no longer an option for those who strive to achieve excellence. I pride myself on being a proactive and ambitious Professional who continuously seeks new challenges and opportunities to grow. Whether it's taking on a complex project, learning a new skill, or stepping into an unfamiliar role, I thrive on the excitement of pushing boundaries and expanding my horizons.
My journey has been marked by a series of diverse assignments that have enriched my expertise and broadened my perspective. From spearheading innovative initiatives to collaborating with cross-functional teams, each experience has taught me invaluable lessons and reinforced my commitment to lifelong learning.
By embracing change and taking calculated risks, I have developed a robust skill set that allows me to adapt quickly and drive success in any ecology . I believe that true growth happens when we step outside our comfort zones and challenge ourselves to reach new heights.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
