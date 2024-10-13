"use strict";

import "./styles.css";

import { renderProjects } from "./feed/feedRenderer";
import { renderAddProject } from "./add-project/addProject";
import renderProjectsCards from "./manage-projects/renderProjectCards";

const content = document.querySelector("#content");

renderProjects();

const feedButton = document.querySelector("#feed-btn");

feedButton.addEventListener("click", renderProjects);

const newProjectButton = document.querySelector("#new-project-btn");

newProjectButton.addEventListener("click", renderAddProject);

const projectsButton = document.querySelector("#projects-btn");
projectsButton.addEventListener("click", renderProjectsCards);

export { content };
