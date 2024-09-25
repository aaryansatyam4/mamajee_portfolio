import React, { useEffect, useRef } from 'react';
import './CareerGraph.css';

const CareerGraph = () => {
  const careerData = [
    {
      date: "Sep 2018 - Till Date",
      role: "Corporate HRBP COE - Partner Workforce Management",
      company: "Vodafone Idea Ltd, Mumbai & Delhi",
      description: "Lead Capability Development, Talent Management, D&I, Employee Engagement.",
    },
    {
      date: "Jun 2016 - Aug 2018",
      role: "Head - Management Development function",
      company: "Idea Cellular Limited, Patna",
    },
    {
      date: "Oct 2013 - May 2016",
      role: "Zonal Business Manager",
      company: "Idea Cellular Limited, Patna",
    },
    {
      date: "Aug 2012 – Sep 2013",
      role: "Head Mobile Commerce",
      company: "Idea Cellular Limited, Patna",
    },
    {
      date: "Sep 2010 – Jul 2012",
      role: "Head Sales Training",
      company: "Idea Cellular Limited, Patna",
    },
    {
      date: "Feb 2010 – Aug 2010",
      role: "Regional Head Training for Agency Training",
      company: "Tata AIG Life Insurance Company",
      description: "Responsible for agency training in Bihar."
    },
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
    {
      date: "Jun 1997 – Feb 1999",
      role: "Channel Support Executive",
      company: "Reliance Telecom Private Limited (RTPL), Patna",
    },
    {
      date: "Jul 1994 – May 1997",
      role: "Assistant Territory Manager",
      company: "Maharaja Whiteline Limited, Delhi",
    },
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
      { threshold: 0.5 } // Animation will trigger when 50% of the element is in view
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
        {careerData.map((item, index) => (
          <li key={index}>
            <div className="date">{item.date}</div>
            <div className="title">{item.role}</div>
            <div className="descr">{item.company}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CareerGraph;
