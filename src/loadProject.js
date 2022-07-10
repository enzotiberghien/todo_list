import { projects } from "./project";
import { editTask, tasks } from "./task.js";


const projectContent = document.querySelector("#project-list")
const content = document.querySelector("#content")

function loadProject() {
    projects.forEach(project => {
        let projectDOM = document.createElement("h3");
        projectDOM.setAttribute("class", "project");
        projectDOM.innerHTML = `<i class="fa-solid fa-list-check"></i> ${project["title"]}`;

        projectContent.prepend(projectDOM)
    })
}

function loadThisProject(project) {
    const tasksDiv = document.querySelectorAll(".task");
    tasksDiv.forEach(task => {
        if (project.trim() !== task.querySelector(".task-project").textContent) {
            task.style.display = "none";
        }
    })

    let projectTitle = document.createElement("h1");
    projectTitle.id = "project-page"
    projectTitle.textContent = project
    content.prepend(projectTitle)
}

export { loadProject, loadThisProject };