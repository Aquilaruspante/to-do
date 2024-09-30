import ToDo from "./toDo";

function createToDo(title, description, dueDate, priority, notes) {
    return new ToDo(title, description, dueDate, priority, notes);
}

function getToDo(projectIndex, index) {
    const toDo = JSON.parse(localStorage.getItem('projects'))[projectIndex].toDos[index];
    return toDo;
}

function updateToDo(projectIndex, index, title, description, dueDate, priority, notes) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const toDo = JSON.parse(localStorage.getItem('projects'))[projectIndex].toDos[index];

    toDo.title = title;
    toDo.description = description;
    toDo.dueDate = dueDate;
    toDo.priority = priority;
    toDo.notes = notes;

    projects[projectIndex].toDos[index] = toDo;

    localStorage.setItem('projects', JSON.stringify(projects));
}

function deleteToDo(projectIndex, index) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const project = projects[projectIndex];

    project.toDos.splice(index);

    localStorage.setItem('projects', JSON.stringify(projects));
}

export { createToDo, getToDo, updateToDo, deleteToDo };
