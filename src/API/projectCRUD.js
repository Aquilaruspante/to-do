import Project from "./project";

const existingProjects = JSON.parse(localStorage.getItem("projects"));

let projects = [];

if (existingProjects) {
  projects = [...existingProjects];
}

function createProject(title, description) {
  const project = new Project(title, description);
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getProject(index) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  const project = projects[index];
  return project;
}

function listProjects() {
  const projects = JSON.parse(localStorage.getItem("projects"));
  return projects;
}

function updateProject(index, title, description) {
  const project = JSON.parse(localStorage.getItem("projects"))[index];
  project.title = title;
  project.description = description;
  projects[index] = project;
  localStorage.setItem("projects", JSON.stringify(projects));
}

function deleteProject(index) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  projects.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addToDoToProject(projectIndex, toDo) {
  const projects = JSON.parse(localStorage.getItem("projects"));
  const project = projects[projectIndex];

  console.log(`prima di aggiungere: ${JSON.stringify(project)}`);
  project.toDos.push(toDo);
  console.log(`toDos aggiornato: ${JSON.stringify(project)}`);

  localStorage.setItem("projects", JSON.stringify(projects));
}

export {
  createProject,
  getProject,
  updateProject,
  addToDoToProject,
  deleteProject,
  listProjects,
};
