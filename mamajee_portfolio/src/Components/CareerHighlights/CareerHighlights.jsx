import React, { useState } from 'react';
import './CareerHighlights.css';

const CareerHighlights = () => { const highlightsData = [
    {
      title: "HRBP Corporate COE - PWM Vertical",
      duration: "April 2022 – Till Date",
      overview: "Handling life cycle management for 12,000 employees across the organization.",
      details: [
        "Budgeting headcount numbers & costs with functional stakeholders.",
        "Creating guidelines for hiring, onboarding, policies, appraisals, and more.",
        "Business intelligence on productivity, salary benchmarking, and attrition.",
        "Partnering with business units & functional teams for headcount & cost efficiencies.",
        "Vendor management & Learning & Development programs based on organizational goals.",
        "Induction of team members and strategic collaboration."
      ]
    },
    {
      title: "Talent, Capability, D&I, Employee Engagement Lead",
      duration: "June 2016 – March 2022",
      overview: "Led learning & development, talent management, and employee engagement initiatives.",
      details: [
        "Owned annual training calendar for classroom, VILT & e-learning programs.",
        "Built a digital framework for learning & development, including learning tools.",
        "Managed talent development, succession planning, and assessment centers.",
        "Built a virtual pool of trainers and managed trainer rollouts.",
        "Spearheaded D&I initiatives and led employee engagement activities.",
        "Created GenPert - a competency development model for HR."
      ]
    },
    {
      title: "Zone Business Manager",
      duration: "Oct 2013 – May 2016",
      overview: "Handled prepaid business for North Bihar, transforming it into the largest zone.",
      details: [
        "Recognized for transforming the business unit into the biggest zone in RMS, CMS & SOGA.",
        "Launched MyCash initiative for opening bank accounts in rural areas.",
        "Received Rockstar and Excellence awards on multiple occasions."
      ]
    },
    {
      title: "Sales Capability Manager",
      duration: "Sept 2010 – Sept 2012",
      overview: "Oversaw performance coaching and development for sales teams.",
      details: [
        "Handled performance coaching and roll-out initiatives.",
        "Inducted new joiners and created learning paths for the sales team.",
        "Conducted root cause analysis for top & bottom performers."
      ]
    }
  ];


  const [openIndex, setOpenIndex] = useState(null);

  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="career-highlights-section" id="ch">
      <h2 className="career-highlights-title">Career Highlights</h2>
      <div className="career-highlights-container">
        {highlightsData.map((highlight, index) => (
          <div key={index} className="career-highlight-card">
            <div className="card-header" onClick={() => toggleDetails(index)}>
              <h3>{highlight.title}</h3>
              <p>{highlight.duration}</p>
              <p className="overview">{highlight.overview}</p>
              <span className="toggle-button">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <div className="card-details">
                <ul>
                  {highlight.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerHighlights;
