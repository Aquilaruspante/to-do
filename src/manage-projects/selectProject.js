import { listProjects } from "../API/projectCRUD";
import { openToDoDialog } from "./toDoDialog";

import { content } from "../index";

export default function selectProject() {
  content.innerHTML = "";
  const projects = listProjects();

  const label = document.createElement("label");
  label.setAttribute("for", "selection");

  const selectorContainer = document.createElement("div");
  selectorContainer.setAttribute("id", "selector-container");

  const selection = document.createElement("select");
  selection.setAttribute("id", "selection");
  selection.setAttribute("name", "selection");
  projects.forEach((project, index) => {
    const option = document.createElement("option");
    option.setAttribute("value", index);
    option.innerText = project.title;
    selection.appendChild(option);
  });

  const toDoArea = document.createElement("div");
  toDoArea.setAttribute("class", "todo-area");

  const submitChoiceButton = document.createElement("button");
  submitChoiceButton.addEventListener("click", () => {
    const header = document.createElement("h2");
    header.innerText = `Add to-do to project: ${projects[selection.value].title}`;
    content.innerHTML = "";
    content.appendChild(header);
    content.appendChild(toDoArea);
    openToDoDialog(toDoArea, selection.value);
  });
  submitChoiceButton.innerText = "select";

  selectorContainer.appendChild(selection);
  selectorContainer.appendChild(submitChoiceButton);
  content.appendChild(selectorContainer);
}
