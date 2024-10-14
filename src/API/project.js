class Project {
  constructor(title, description) {
    if (!title || typeof title !== "string") {
      throw new Error("Project must have a valid title!");
    }
    if (!description || typeof description !== "string") {
      throw new Error("Project must have a valid description");
    }

    this.title = title;
    this.description = description;
    this.toDos = [];
  }

  addToDo(toDo) {
    if (!toDo) {
      throw new Error("Cannot add an empty to do");
    }
    this.toDos.push(toDo);
  }
}

export default Project;
