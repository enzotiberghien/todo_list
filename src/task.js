import { priorityColor, resetPage } from ".";

let tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];

const content = document.querySelector("#content")

function Task(title, project, dueDate, priority) {
    this.title = title;
    this.project = project
    this.dueDate = dueDate;
    this.priority = priority;
}

function createTask(title, project, dueDate, priority) {
    tasks.push(new Task(title, project, dueDate, priority));
    updateTasksList();

    let taskDiv = document.createElement("div");
    taskDiv.setAttribute("class", "task");
    taskDiv.innerHTML = `
        <div class="task-priority"></div>
            <div class="task-left">
                <input type="checkbox" name="completed" id="completed">
            </div>
            <div class="task-middle">
                <h3 class="task-title">${title}</h3>
                <h3 class="task-project">${project}</h3>
            </div>
            <div class="task-right">
                <h3 class="task-date">${dueDate}</h3>
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        </div>`;

    priorityColor(taskDiv, priority)

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
        const taskPriorityColor = taskDiv.querySelector(".task-priority");


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

    if (content.querySelector("h1")) content.querySelector("h1").after(taskDiv)
    else content.prepend(taskDiv)
}

function deleteTask(task) {
    tasks = tasks.filter(e => e["title"] !== task);
    updateTasksList();
}

function editTask(task, title, project, date, priority) {
    const objIndex = tasks.findIndex((obj => obj.title == task));
    tasks[objIndex].title = title
    tasks[objIndex].project = project
    tasks[objIndex].dueDate = date
    tasks[objIndex].priority = priority

    updateTasksList();
}
 
function updateTasksList() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

export { tasks, Task, createTask, deleteTask, editTask };