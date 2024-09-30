'use strict';

import './styles.css';

import { renderProjects } from './feedRenderer';
import { renderAddProject } from './addProject';

const content = document.querySelector('#content');

renderProjects();

const middleButton = document.querySelector('#no-todo-button');

middleButton.addEventListener('click', () => {
    renderAddProject();
})