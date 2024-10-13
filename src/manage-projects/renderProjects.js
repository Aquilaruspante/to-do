"use strict";

import renderEditProject from "./editProject";

const projectsNav = document.querySelector("#projects");

function renderProjectsButtons() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  if (projects) {
    projectsNav.innerHTML = "<h3>Your Projects</h3>";
    projects.forEach((project, index) => {
      const button = document.createElement("button");
      button.setAttribute("class", "nav-btn");
      button.innerText = project.title;
      button.addEventListener("click", () => renderEditProject(index));
      projectsNav.appendChild(button);
    });
  }
}

export default renderProjectsButtons;
