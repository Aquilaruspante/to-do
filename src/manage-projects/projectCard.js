import { openToDoDialog } from "./toDoDialog";
import { format } from "date-fns";

class ProjectCard {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.card = null;
    this.toDoArea = null;
  }

  create() {
    const card = document.createElement("div");
    card.setAttribute("class", "project-card");
    const header = document.createElement("h3");
    header.setAttribute("class", "project-card-header");
    header.innerText = this.name;
    const body = document.createElement("div");
    body.setAttribute("class", "project-card-body");
    body.innerText = this.description;

    card.appendChild(header);
    card.appendChild(body);

    this.card = card;
  }
}

class ProjectCardWithTodos extends ProjectCard {
  constructor(name, description, toDos, projectIndex) {
    super(name, description);
    this.toDos = toDos;
    this.projectIndex = projectIndex;
  }

  createTodos() {
    const toDoArea = document.createElement("div");
    toDoArea.setAttribute("class", "todo-area");
    this.toDoArea = toDoArea;

    if (this.toDos.length) {
      const toDoList = document.createElement("ul");
      toDoList.setAttribute("class", "todo-list");
      this.toDos.forEach((toDo) => {
        const li = document.createElement("li");
        li.setAttribute("class", "todo-element");
        li.innerHTML = `<div class="todo-element-header"><h4 class="todo-element-title">${toDo.title}</h4><p>Due date: ${format(toDo.dueDate, "dd-MM-yyyy")}</p></div>`;
        toDoList.appendChild(li);
        toDoArea.appendChild(toDoList);
      });
    } else {
      const noToDo = document.createElement("h3");
      noToDo.setAttribute("id", "no-todo");
      noToDo.innerHTML = "No ToDos added!";
      toDoArea.appendChild(noToDo);
    }

    const addToDoButton = document.createElement("button");
    addToDoButton.setAttribute("class", "add-todo-button");
    addToDoButton.innerText = "+";
    addToDoButton.addEventListener("click", () =>
      openToDoDialog(this.toDoArea, this.projectIndex)
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.setAttribute("class", "add-todo-button-container");
    buttonContainer.appendChild(addToDoButton);

    toDoArea.appendChild(buttonContainer);

    this.card.setAttribute("class", "project-card no-hover");
    this.card.appendChild(toDoArea);
  }
}

export { ProjectCard, ProjectCardWithTodos };
