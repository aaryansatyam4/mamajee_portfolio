import React, { useEffect, useRef } from 'react';
import './CareerGraph.css';

const CareerGraph = () => {
  const careerData = [
    {
      company: "Vodafone Idea Ltd, Mumbai & Delhi",
      roles: [
        {
          date: "Sep 2018 - Till Date",
          role: "Corporate HRBP COE - Partner Workforce Management",
          description: "Lead Capability Development, Talent Management, D&I, Employee Engagement.",
        },
      ]
    },
    {
      company: "Idea Cellular Limited, Patna",
      roles: [
        {
          date: "Jun 2016 - Aug 2018",
          role: "Head - Management Development function",
        },
        {
          date: "Oct 2013 - May 2016",
          role: "Zonal Business Manager",
        },
        {
          date: "Aug 2012 – Sep 2013",
          role: "Head Mobile Commerce",
        },
        {
          date: "Sep 2010 – Jul 2012",
          role: "Head Sales Training",
        }
      ]
    },
    {
      company: "Other Experiences",
      roles: [
        {
          date: "Mar 2007 – Feb 2010",
          role: "Cluster Training Head",
          company: "Max New York Life Insurance Company Ltd., Raipur",
          description: "Handled training for Chhattisgarh region."
        },
        {
          date: "Apr 2005 – Feb 2007",
          role: "Product Manager for MBA Test Preparation",
          company: "IMS Learning Resources Pvt Ltd., Jaipur & Mumbai",
        },
        {
          date: "Jan 2004 – Mar 2005",
          role: "Project Head (English Language, GD & PI)",
          company: "Smartways Educational & Training Services, Jaipur",
        },
        {
          date: "Feb 2001 – Dec 2003",
          role: "Faculty – Language, GD & PI",
          company: "Professional Tutorials, Jaipur",
        },
        {
          date: "Apr 1999 – Jan 2001",
          role: "Technical Effectiveness Consultant",
          company: "NIS Sparta, Jaipur & Delhi",
        },
        
      
      ]
    }
  ];

  const timelineRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('li');
      items.forEach((item) => observer.observe(item));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="career-timeline-section" id="cg">
      <h1 className="career-timeline-title">Career Graph</h1>
      <ul className="career-timeline" ref={timelineRef}>
        {careerData.map((companyItem, index) => (
          <li key={index} className="career-timeline-item">
            <div className="title">{companyItem.company}</div>
            {companyItem.roles.map((role, idx) => (
              <div key={idx} className="role-section">
                <div className="date">{role.date}</div>
                <div className="role">{role.role}</div>
                {role.description && <div className="description">{role.description}</div>}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CareerGraph;
