import "./project-card.css";
import { ProjectCard } from "./projectCard";
import renderEditProject from "./editProject";
import { content } from "../index";

const projectListHeader = document.createElement("h2");
projectListHeader.setAttribute("id", "your-projects");
projectListHeader.innerText = "Your Projects";

function renderProjectsCards() {
  content.innerHTML = "";
  content.appendChild(projectListHeader);
  const projects = JSON.parse(localStorage.getItem("projects"));
  projects.forEach((project, index) => {
    const cardElement = new ProjectCard(project.title, project.description);
    cardElement.create();
    content.appendChild(cardElement.card);
    cardElement.card.addEventListener("click", () => renderEditProject(index));
  });
}

export default renderProjectsCards;
