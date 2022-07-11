import { resetPage } from ".";
import { loadTasks } from "./loadTasks";
import { projects, deleteProject } from "./project";
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
        } else task.style.display = "flex";
    })

    if (!document.querySelector("#project-page")) {
        let projectTitle = document.createElement("div");
        projectTitle.id = "project-page";
        projectTitle.innerHTML = `<h1>${project}</h1><i class="fa-solid fa-trash delete-btn" id="delete-project">`
        content.prepend(projectTitle)

        projectTitle.querySelector("i").addEventListener("click", () => {
            deleteProject(project)
            const taskDivs = document.querySelectorAll(".task");   
            taskDivs.forEach(e => {
                if (e.querySelector(".task-project").textContent === project.trim()) e.remove()
            })
            resetPage()
        })
    } else document.querySelector("#project-page h1").textContent = project
}

export { loadProject, loadThisProject };