import { tasks, Task, createTask, deleteTask, editTask } from "./task.js";
import { createProject, projects } from "./project.js";
import { loadTasks } from "./loadTasks.js";
import { loadProject, loadThisProject } from "./loadProject.js";
import { loadToday } from "./loadToday.js";
import { loadUpcoming } from "./loadUpcoming.js";

loadProject();
loadTasks();

const addTaskForm = document.querySelector("#task-form");
const addProjectForm = document.querySelector("#project-form");
const addProjectBtn = document.querySelector("#add-project-btn");
const addTaskBtn = document.querySelector("#add-task-btn");
const cancelBtn = document.querySelector("#form-task-cancel");
const projectCancelBtn = document.querySelector("#form-project-cancel");
const content = document.querySelector("#content");
const deleteBtns = document.querySelectorAll(".delete-btn");
const editBtns = document.querySelectorAll(".edit-btn");
let taskDivs = document.querySelectorAll(".task");
const tasksBtn = document.querySelector("#tasks");
const todayBtn = document.querySelector("#today");
const upcomingBtn = document.querySelector("#upcoming");
const projectTabs = document.querySelectorAll(".project");

// Reset Tasks page
function resetPage() {
    taskDivs = document.querySelectorAll(".task");   
    if (document.querySelector("#project-page")) {
        document.querySelector("#project-page").remove();
    }
    taskDivs.forEach(task => task.style.display = "flex");
}

// Tasks Page
tasksBtn.addEventListener("click", () => {
    resetPage()
})

// Add task Form
addTaskForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = addTaskForm.elements["title-form"].value
    const project = addTaskForm.elements["project-task-form"].value
    const dueDate = addTaskForm.elements["dueDate-form"].value
    let priority = addTaskForm.elements["priority-form"];
    priority = priority.options[priority.selectedIndex].value;
    createTask(title, project, dueDate, priority)
    addTaskBtn.style.display = "block";
    addTaskForm.style.display = "none";
})

function hideAndShow(element1, element2) {
    element1.style.display = "flex";
    element2.style.display = "none";
}

function priorityColor(task, priority) {
    const taskPriorityColor = task.querySelector(".task-priority");

    switch(priority) {
        case "1":
            taskPriorityColor.style.backgroundColor = "red";
            break;
        case "2":
            taskPriorityColor.style.backgroundColor = "orange";
            break;
        case "3":
            taskPriorityColor.style.backgroundColor = "green";
            break;
        case "4":
            taskPriorityColor.style.backgroundColor = "blue";
            break;
    }
}

addTaskBtn.addEventListener("click", () => hideAndShow(addTaskForm, addTaskBtn))
cancelBtn.addEventListener("click", () => hideAndShow(addTaskBtn, addTaskForm))

// Event listener for each new task
taskDivs.forEach(taskDiv => {
    taskDiv.querySelector("#completed").addEventListener("click", () => {
        const txt = taskDiv.querySelector(".task-title");
        if (txt.style.textDecoration !== "line-through") {
            txt.style.textDecoration = "line-through"
            taskDiv.style.opacity = "0.5";
        } else {
            txt.style.textDecoration = "none";
            taskDiv.style.opacity = "1";
        }
    })

    taskDiv.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTask(taskDiv.querySelector(".task-title").textContent)
        taskDiv.remove();
    })

    taskDiv.querySelector(".edit-btn").addEventListener("click", () => {
        const form = document.createElement("form");
        form.setAttribute("class", "add-task-form");
        form.id = "task-form";

        const title = taskDiv.querySelector(".task-title")
        const originalTitle = taskDiv.querySelector(".task-title").textContent
        const project = taskDiv.querySelector(".task-project")
        const date = taskDiv.querySelector(".task-date")

        form.innerHTML = `
            <input type="text" placeholder="Title" id="title-form" value="${title.textContent}" required>
            <input type="text" placeholder="Project" id="project-form" value="${project.textContent}" required>
            <input type="date" name="dueDate-form" id="dueDate-form" value="${date.textContent}" required>
            <select name="priority-form" id="priority-form" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button type="submit">Add</button>
            <button id="form-task-cancel">Cancel</button>`
        form.style.display = "flex"
        taskDiv.replaceWith(form)

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const taskPriorityColor = taskDiv.querySelector(".task-priority");
            title.textContent = form.elements["title-form"].value
            project.textContent = form.elements["project-form"].value
            date.textContent = form.elements["dueDate-form"].value
            let priority = form.elements["priority-form"];
            priority = priority.options[priority.selectedIndex].value;

            priorityColor(taskDiv, priority)

            editTask(originalTitle, form.elements["title-form"].value, form.elements["project-form"].value, form.elements["dueDate-form"].value, priority);


            form.replaceWith(taskDiv);
        })
    })
})


// Project form
addProjectBtn.addEventListener("click", () => hideAndShow(addProjectForm, addProjectBtn))
projectCancelBtn.addEventListener("click", () => hideAndShow(addProjectBtn, addProjectForm))

addProjectForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = addProjectForm.elements["title-project"].value
    createProject(title)
    addProjectBtn.style.display = "block";
    addProjectForm.style.display = "none";
})

// Event listener for each new project
projectTabs.forEach(project => {
    project.addEventListener("click", () => {
        resetPage()
        loadThisProject(project.textContent);
    })
})

// Today Page
todayBtn.addEventListener("click", () => {
    resetPage()
    loadToday();
})

// Upcoming Page
upcomingBtn.addEventListener("click", () => {
    resetPage()
    loadUpcoming();
})

export { resetPage, priorityColor }