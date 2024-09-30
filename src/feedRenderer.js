import './feed.css';

import { listProjects } from "./projectCRUD";

let toDos = [];

const projects = listProjects();

function renderProjects() {
    try {
        projects.forEach(project => {
            toDos = [...toDos, ...project.toDos];
        })
        
        if (toDos.length) {
            toDos.forEach((toDo) => {
                const div = document.createElement('div');
                div.setAttribute('class', 'todo-card');
                div.innerHTML = `<header class="todo-header"><h3>${toDo.title}</h3></header>`
                content.appendChild(div);
            })
        }
    
    } catch {
        const noToDosElement = document.createElement('div');
        noToDosElement.setAttribute('class', 'no-todo-feed');
        noToDosElement.innerHTML = '<h2>No To-Dos yet. Log your first one</h2><button id="no-todo-button">+</button>';
        content.appendChild(noToDosElement);
    }
}

export { renderProjects };
