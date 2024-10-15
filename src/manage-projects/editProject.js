import { content } from "../index";
import { ProjectCardWithTodos } from "./projectCard";

const box = document.createElement("div");
box.setAttribute("class", "project-card no-hover");

const header = document.createElement("h2");
header.setAttribute("class", "project-card-header");

const body = document.createElement("div");
body.setAttribute("class", "project-card-body");

function renderEditProject(projectIndex) {
  const project = JSON.parse(localStorage.getItem("projects"))[projectIndex];

  const projectCard = new ProjectCardWithTodos(
    project.title,
    project.description,
    project.toDos,
    projectIndex
  );
  projectCard.create();
  projectCard.createTodos();
  projectCard.addCloseButton();

  content.innerHTML = "";
  content.appendChild(projectCard.card);
}

export default renderEditProject;
