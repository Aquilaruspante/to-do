import "./feed.css";

import { listProjects } from "../API/projectCRUD";
import { renderAddProject } from "../add-project/addProject";
import renderProjectsButtons from "../manage-projects/renderProjects";
import { updateToDo } from "../API/todDoCRUD";
import { content } from "../index";

import { format } from "date-fns";

const projects = listProjects();

const noToDoTitle = document.createElement("h2");
noToDoTitle.innerText = "No ToDos yet. Log your first one...";

const noToDoButton = document.createElement("button");
noToDoButton.setAttribute("id", "no-todo-button");
noToDoButton.innerText = "+";
noToDoButton.addEventListener("click", renderAddProject);

const noToDosElement = document.createElement("div");
noToDosElement.setAttribute("class", "no-todo-feed");
noToDosElement.appendChild(noToDoTitle);
noToDosElement.appendChild(noToDoButton);

function renderProjects() {
  let toDos = [];
  content.innerHTML = "";
  if (projects) {
    projects.forEach((project) => {
      project.toDos.forEach((toDo, index) => {
        toDos.push([toDo, index]);
      });
    });
  }

  if (toDos.length) {
    toDos.forEach((toDoIndexCouple) => {
      const div = document.createElement("div");
      div.setAttribute("class", "todo-card");

      const h3 = document.createElement("h3");
      h3.innerText = toDoIndexCouple[0].title;

      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (toDoIndexCouple[0].complete) {
        input.setAttribute("checked", true);
      }
      input.addEventListener("click", () => {
        toDoIndexCouple[0].complete = !toDoIndexCouple[0].complete;
        updateToDo(
          toDoIndexCouple[0].projectIndex,
          toDoIndexCouple[1],
          toDoIndexCouple[0].title,
          toDoIndexCouple[0].description,
          toDoIndexCouple[0].dueDate,
          toDoIndexCouple[0].priority,
          toDoIndexCouple[0].notes,
          toDoIndexCouple[0].complete
        );
      });
      h3.appendChild(input);

      const date = document.createElement("p");
      date.innerText = `Due date: ${format(toDoIndexCouple[0].dueDate, "dd-MM-yyyy")}`;

      const projectLink = document.createElement("p");
      projectLink.setAttribute("class", "project-link");
      const projects = JSON.parse(localStorage.getItem("projects"));
      console.log(projects);
      console.log(toDoIndexCouple[0].projectIndex);
      const project = projects[toDoIndexCouple[0].projectIndex];
      projectLink.innerText = `Project: ${project.title}`;

      div.appendChild(h3);
      div.appendChild(date);
      div.appendChild(projectLink);
      content.appendChild(div);
    });
  } else {
    content.appendChild(noToDosElement);
  }
  renderProjectsButtons();
}

export { renderProjects };
