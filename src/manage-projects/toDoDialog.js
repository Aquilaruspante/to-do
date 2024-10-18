import FormElement from "../add-project/FormElement";
import { createToDo } from "../API/todDoCRUD";
import { addToDoToProject } from "../API/projectCRUD";
import renderEditProject from "./editProject";

function createAndAddToDo(
  title,
  description,
  dueDate,
  priority,
  notes,
  projectIndex
) {
  if (
    title !== "" &&
    description !== "" &&
    dueDate !== "" &&
    priority !== "" &&
    notes !== ""
  ) {
    const newToDo = createToDo(
      title,
      description,
      dueDate,
      priority,
      notes,
      projectIndex
    );
    addToDoToProject(projectIndex, newToDo);
    renderEditProject(projectIndex);
  } else {
    alert("You need to fill all fields!!!");
  }
}

function openToDoDialog(toDoArea, projectIndex) {
  const addTodoButton = document.querySelector(".add-todo-button");
  if (addTodoButton) addTodoButton.setAttribute("disabled", true);

  console.log("too area: ", toDoArea, " index: ", projectIndex);
  // container element.

  const dialogContainer = document.createElement("div");
  dialogContainer.setAttribute("class", "dialog-container");

  // subElements creation.

  const titleElement = new FormElement("Title", "text", "todo-title");
  dialogContainer.appendChild(titleElement.create());

  const descriptionElement = new FormElement(
    "Description",
    "textarea",
    "description"
  );
  dialogContainer.appendChild(descriptionElement.create());

  const dueDateElement = new FormElement("Due date", "date", "due-date");
  dialogContainer.appendChild(dueDateElement.create());

  const priorityElement = document.createElement("div");
  priorityElement.setAttribute("class", "form-element");

  const priorityInput = document.createElement("select");
  priorityInput.setAttribute("id", "priority");
  priorityInput.setAttribute("name", "priority");

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.innerText = "Priority";

  const highOption = document.createElement("option");
  highOption.innerText = "High";
  highOption.setAttribute("value", "high");

  const mediumOption = document.createElement("option");
  mediumOption.innerText = "Medium";
  mediumOption.setAttribute("value", "medium");

  const lowOption = document.createElement("option");
  lowOption.innerText = "Low";
  lowOption.setAttribute("value", "low");

  priorityInput.appendChild(highOption);
  priorityInput.appendChild(mediumOption);
  priorityInput.appendChild(lowOption);

  priorityElement.appendChild(priorityLabel);
  priorityElement.appendChild(priorityInput);

  dialogContainer.appendChild(priorityElement);

  const notesElement = new FormElement("Notes", "textarea", "notes");
  dialogContainer.appendChild(notesElement.create());

  const button = document.createElement("button");
  button.setAttribute("class", "dialog-btn");
  button.innerText = "Add";
  button.addEventListener("click", () => {
    createAndAddToDo(
      titleElement.input.value,
      descriptionElement.input.value,
      dueDateElement.input.value,
      priorityInput.value,
      notesElement.input.value,
      projectIndex
    );
  });

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";

  cancelButton.addEventListener("click", () => {
    toDoArea.removeChild(dialogContainer);
    addTodoButton.removeAttribute("disabled");
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "dialog-buttons-container");

  // Elements sorting.

  buttonsContainer.appendChild(button);
  buttonsContainer.appendChild(cancelButton);

  dialogContainer.appendChild(buttonsContainer);

  toDoArea.appendChild(dialogContainer);
}

export { openToDoDialog };
