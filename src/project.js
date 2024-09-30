class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.toDos = [];
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
    }
}

export default Project;