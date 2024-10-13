"use strict";

import "./newProjectForm.css";

import FormElement from "./FormElement";
import { createProject } from "../API/projectCRUD";
import { renderProjects } from "../feed/feedRenderer";
import { content } from "../index";

const form = document.createElement("form");
form.setAttribute("id", "new-project-form");
const fieldSet = document.createElement("fieldset");
form.appendChild(fieldSet);
const legend = document.createElement("legend");
legend.innerText = "ADD PROJECT";
fieldSet.appendChild(legend);

const titleElement = new FormElement("Title", "text", "form-title");
const descriptionElement = new FormElement(
  "description",
  "textarea",
  "form-description"
);

fieldSet.appendChild(titleElement.create());
fieldSet.appendChild(descriptionElement.create());

const addButton = document.createElement("button");
addButton.setAttribute("type", "button");
addButton.innerText = "Add";
addButton.addEventListener("click", () => {
  createProject(titleElement.input.value, descriptionElement.input.value);
  titleElement.input.value = null;
  descriptionElement.input.value = null;
  renderProjects();
});

fieldSet.appendChild(addButton);

function renderAddProject() {
  content.innerHTML = "";
  content.appendChild(form);
}

export { renderAddProject };
