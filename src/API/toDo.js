class ToDo {
  constructor(title, description, dueDate, priority, notes, projectIndex) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.projectIndex = projectIndex;
    this.complete = false;
  }
}

export default ToDo;
