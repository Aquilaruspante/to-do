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
  console.log("too area: ", toDoArea, " index: ", projectIndex);
  // container element.

  const dialogContainer = document.createElement("div");
  dialogContainer.setAttribute("class", "dialog-container");

  // subElements creation.

  const titleElement = new FormElement("Title", "text", "title");
  dialogContainer.appendChild(titleElement.create());

  const descriptionElement = new FormElement(
    "Description",
    "textarea",
    "description"
  );
  dialogContainer.appendChild(descriptionElement.create());

  const dueDateElement = new FormElement("Due date", "date", "due-date");
  dialogContainer.appendChild(dueDateElement.create());

  const priorityElement = new FormElement("Priority", "text", "priority");
  dialogContainer.appendChild(priorityElement.create());

  const notesElement = new FormElement("Notes", "textarea", "notes");
  dialogContainer.appendChild(notesElement.create());

  const button = document.createElement("button");
  button.setAttribute("class", "dialog-btn");
  button.innerText = "Add";
  button.addEventListener("click", () =>
    createAndAddToDo(
      titleElement.input.value,
      descriptionElement.input.value,
      dueDateElement.input.value,
      priorityElement.input.value,
      notesElement.input.value,
      projectIndex
    )
  );

  // Elements sorting.

  dialogContainer.appendChild(button);

  toDoArea.appendChild(dialogContainer);
}

export { openToDoDialog };
