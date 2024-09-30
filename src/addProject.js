'use strict';

import FormElement from "./FormElement";

const form = document.createElement('form');
form.setAttribute('id', 'new-project-form');



const titleElement = new FormElement('Title', 'text', 'title');
const descriptionElement = new FormElement('description', 'textarea', 'description');
const dateElement = new FormElement('Due Date', 'date', 'date');
const priorityElement = new FormElement('Priority', 'range', 'priority')
const notesElement = new FormElement('Notes', 'textarea', 'notes');

function renderAddProject () {
    content.innerHTML = '';
    content.appendChild(titleElement.create());
    content.appendChild(descriptionElement.create());
    content.appendChild(dateElement.create());
    content.appendChild(priorityElement.create());
    content.appendChild(notesElement.create());
}


export { renderAddProject };