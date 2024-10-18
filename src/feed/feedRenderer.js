import "./feed.css";

import closeButtonImage from "../../images/icons8-close-window-24.png";

import { listProjects } from "../API/projectCRUD";
import { renderAddProject } from "../add-project/addProject";
import renderProjectsButtons from "../manage-projects/renderProjects";
import { updateToDo, deleteToDo } from "../API/todDoCRUD";
import { content } from "../index";
import selectProject from "../manage-projects/selectProject";
import renderEditProject from "../manage-projects/editProject";

import { format } from "date-fns";

const noProjectTitle = document.createElement("h2");
noProjectTitle.innerText = "No projects yet. Log your first one...";

const noProjectButton = document.createElement("button");
noProjectButton.setAttribute("id", "no-todo-button");
noProjectButton.innerText = "+";
noProjectButton.addEventListener("click", renderAddProject);

const noToDoTitle = document.createElement("h2");
noToDoTitle.innerText = "No ToDos yet. Log your first one...";

const noToDoButton = document.createElement("button");
noToDoButton.setAttribute("id", "no-todo-button");
noToDoButton.innerText = "+";
noToDoButton.addEventListener("click", selectProject);

const noToDosElement = document.createElement("div");
noToDosElement.setAttribute("class", "no-todo-feed");

function renderProjects() {
  const projects = listProjects() || [];
  let toDos = [];
  let toDoAndIndex = [];
  content.innerHTML = "";
  noToDosElement.innerHTML = "";

  function createFeedHeader() {
    const header = document.createElement("div");
    header.setAttribute("class", "feed-header");

    const title = document.createElement("h2");
    title.setAttribute("id", "feed-title");
    title.innerText = "Your to-dos";

    const paragraph = document.createElement("p");
    paragraph.setAttribute("id", "feed-paragraph");
    paragraph.innerText = `To-dos are sorted by date, click on the checkbox to mark them as complete, click on the "x" to delete them!
      Click on the project name to see it!`;

    header.appendChild(title);
    header.appendChild(paragraph);

    content.appendChild(header);
  }

  if (projects.length) {
    projects.forEach((project) => {
      project.toDos.forEach((toDo) => {
        toDos.push(toDo);
      });
    });
    sortTodosByDate(toDos);
    toDos.forEach((toDo, index) => {
      toDoAndIndex.push([toDo, index]);
    });
  } else {
    noToDosElement.appendChild(noProjectTitle);
    noToDosElement.appendChild(noProjectButton);
    content.appendChild(noToDosElement);
    return;
  }

  if (toDos.length) {
    createFeedHeader();
    toDoAndIndex.forEach((toDoIndexCouple) => {
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

      const project = projects[toDoIndexCouple[0].projectIndex];
      if (project) projectLink.innerText = `Project: ${project.title}`;
      projectLink.addEventListener("click", () =>
        renderEditProject(toDoIndexCouple[0].projectIndex)
      );

      const closeButton = createCloseTodoButton(
        toDoIndexCouple[1],
        projects.indexOf(toDoIndexCouple[0]),
        reRenderProjects
      );

      const imageContainer = document.createElement("div");
      imageContainer.appendChild(closeButton);

      const flexContainer = document.createElement("div");
      flexContainer.setAttribute("class", "flex-container");

      div.appendChild(flexContainer);

      flexContainer.appendChild(h3);
      flexContainer.appendChild(date);
      flexContainer.appendChild(projectLink);
      flexContainer.appendChild(imageContainer);
      content.appendChild(div);
    });
  } else {
    noToDosElement.appendChild(noToDoTitle);
    noToDosElement.appendChild(noToDoButton);
    content.appendChild(noToDosElement);
  }
  renderProjectsButtons();
}

function reRenderProjects() {
  renderProjects();
}

function sortTodosByDate(toDos) {
  toDos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

function createCloseTodoButton(projectIndex, index, afterwards) {
  console.log(projectIndex, index);
  const closeButton = document.createElement("img");
  closeButton.setAttribute("class", "close-button");
  closeButton.setAttribute("src", closeButtonImage);
  closeButton.setAttribute("alt", "close-x");
  closeButton.addEventListener("click", () => {
    deleteToDo(projectIndex, index);
    afterwards();
  });

  return closeButton;
}

export { renderProjects, sortTodosByDate, createCloseTodoButton };
