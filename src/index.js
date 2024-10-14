"use strict";

import "./styles.css";

import { renderProjects } from "./feed/feedRenderer";
import { renderAddProject } from "./add-project/addProject";
import renderProjectsCards from "./manage-projects/renderProjectCards";

const content = document.querySelector("#content");

function handleNavigation(view) {
  content.innerHTML = "";
  switch (view) {
    case "feed":
      renderProjects();
      break;
    case "new-project":
      renderAddProject();
      break;
    case "manage-projects":
      renderProjectsCards();
      break;
    default:
      console.error("Unknown view:", view);
      renderProjects();
  }
}

function setupEventListeners() {
  const feedButton = document.querySelector("#feed-btn");
  const newProjectButton = document.querySelector("#new-project-btn");
  const projectsButton = document.querySelector("#projects-btn");

  feedButton.addEventListener("click", () => handleNavigation("feed"));
  newProjectButton.addEventListener("click", () =>
    handleNavigation("new-project")
  );
  projectsButton.addEventListener("click", () =>
    handleNavigation("manage-projects")
  );
}

function init() {
  setupEventListeners();
  handleNavigation("feed");
}

init();

export { content };
