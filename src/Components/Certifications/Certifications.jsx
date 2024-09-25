import React from 'react';
import './Certifications.css';
import { FaMedal, FaCertificate, FaCheckCircle, FaAward } from 'react-icons/fa'; // Icons for the certificates

const certificationsData = [
  {
    title: "Certified MBTI Practitioner",
    icon: <FaMedal />,
  },
  {
    title: "Certified on Human Job Assessment (HJA), Personal Profile Assessment (PPA), Team Analysis Services (TAS), Tests for Selection & Training (GIA)",
    icon: <FaCertificate />,
  },
  {
    title: "Certified NLP Practitioner",
    icon: <FaCheckCircle />,
  },
  {
    title: "Certified Trainer for Adventures in Attitude (AIA) & SPIN Selling by Carlson Learning Company",
    icon: <FaAward />,
  },
  {
    title: "Certification on Strategic Enablement for HR Professional",
    icon: <FaMedal />,
  },
  {
    title: "Certified for Conducting Recruitment & Goal Setting Workshops",
    icon: <FaCertificate />,
  },
  {
    title: "Licentiate - III",
    icon: <FaCheckCircle />,
  },
];

const Certifications = () => {
  return (
    <section className="certifications-section" id="crtfct">
      <h2 className="certifications-title">Certifications</h2>
      <div className="certifications-grid">
        {certificationsData.map((cert, index) => (
          <div key={index} className="certification-item">
            <div className="certification-icon">{cert.icon}</div>
            <div className="certification-title">{cert.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
