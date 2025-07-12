import React from "react";
import "./Project.css";

const projects = [
  {
    title: " Insourcing Project |   Feb 2024 - May 2024",
    description:
      "Post-merger, we successfully insourced 3,000 associates within 60 days, building the entire process from scratch, including selection guidelines and CTC benchmarking, and completed the project on time.",
  },
  {
    title: "Organizational Values | Oct 2023 - Jan 2024",
    description:
      "Designed the Learning module on Organizational Value for the organization . As a part of the team created the content, Faculty guides & did the train the trainers workshop for the Master Trainers identified in the organization .",
  },
  {
    title: "Project GenPert ",
    description:
      "Project GenPert was designed to create a comprehensive learning journey for the HR function, based on the T-shaped model. It included ILT, peer learning, and curated, customized online courses across various verticals.",
  },
  {
    title: "Retail CRE attrition",
    description:
      "The Retail segment has one of the highest early attrition in the country . I was a part of the CFT which did a root cause analysis on the reasons of attritions , suggested means & oversaw the recommendations getting implemented",
  },
];

const Project = () => {
  return (
    <section className="projects-section" id="project">
      <h2 className="projects-title">Significant Projects</h2>
      <div className="flip-card-container">
        {projects.map((project, index) => (
          <div className="flip-card" key={index}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{project.title}</h3>
              </div>
              <div className="flip-card-back">
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
