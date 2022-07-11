import { resetPage } from ".";
import { loadThisProject } from "./loadProject";
import { loadTasks } from "./loadTasks";
import { deleteTaskByProject, tasks } from "./task";

let projects = JSON.parse(window.localStorage.getItem("projects")) || [];

const projectContent = document.querySelector("#project-list")

function Project(title) {
    this.title = title;
}

function createProject(title) {
    projects.push(new Project(title));
    updateProjectList();

    let projectDOM = document.createElement("h3");
    projectDOM.setAttribute("class", "project");
    projectDOM.innerHTML = `<i class="fa-solid fa-list-check"></i> ${title}`;

    projectDOM.addEventListener("click", () => {
        resetPage()
        loadThisProject(projectDOM.textContent);
    })

    projectContent.prepend(projectDOM)
}

function updateProjectList() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function deleteProject(project) {
    projects = projects.filter(e => e["title"] !== project.trim());
    updateProjectList();
    let projectsTab = document.querySelectorAll(".project");
    projectsTab.forEach(e => {
        if (e.textContent === project) e.remove()
    })
    deleteTaskByProject(project);
    console.log(tasks)
}
 
export { createProject, projects, deleteProject };