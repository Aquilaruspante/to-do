import "./project-card.css";
import { ProjectCard } from "./projectCard";
import renderEditProject from "./editProject";
import { content } from "../index";

const projectListHeader = document.createElement("h2");
projectListHeader.setAttribute("id", "your-projects");
projectListHeader.innerText = "Your Projects";

const description = document.createElement("p");
description.setAttribute("id", "project-legend");
description.innerText = "Click on a project card to expand it!";

function renderProjectsCards() {
  content.innerHTML = "";
  content.appendChild(projectListHeader);
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (projects.length) {
    content.appendChild(description);
    projects.forEach((project, index) => {
      const cardElement = new ProjectCard(project.title, project.description);
      cardElement.create();
      content.appendChild(cardElement.card);
      cardElement.card.addEventListener("click", () =>
        renderEditProject(index)
      );
    });
  } else {
    const noProjects = document.createElement("p");
    noProjects.innerText = "No projects yet...";
    noProjects.setAttribute("id", "no-projects-legend");
    content.appendChild(noProjects);
  }
}

export default renderProjectsCards;
