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

    projectContent.prepend(projectDOM)
}

function updateProjectList() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export { createProject, projects };