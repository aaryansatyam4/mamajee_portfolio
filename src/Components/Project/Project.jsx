import React from "react";
import "./Project.css";

const projects = [
  {
    title: "Organizational Values | 2023",
    description:
      "Created the Learning module on Organizational Value. Covered 100% of the organization in 4 months. Received individual and team awards.",
  },
  {
    title: "Project GenPert | 2022",
    description:
      "A comprehensive project for the HR function, received a national level individual award for creating a learning journey using the T-shaped model.",
  },
  {
    title: "Project Atmanirbhar | 2024",
    description:
      "Insourced approximately 3500 associates in 60 days. Built the process from scratch, received a national team award for this project.",
  },
  {
    title: "Retail CRE Attrition | 2022",
    description:
      "Analyzed high attrition rates in the retail segment and implemented recommendations to improve retention. Part of a cross-functional team.",
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
