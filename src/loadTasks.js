import { tasks } from "./task.js";
import { deleteBtnEvent } from "./index.js";

const content = document.querySelector("#content")

function loadTasks() {
    tasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task");
        taskDiv.innerHTML = `
        <div class="task-priority"></div>
            <div class="task-left">
                <input type="checkbox" name="completed" id="completed">
            </div>
            <div class="task-middle">
                <h3 class="task-title">${task["title"]}</h3>
                <h3 class="task-project">${task["project"]}</h3>
            </div>
            <div class="task-right">
                <h3 class="task-date">${task["dueDate"]}</h3>
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn"></i>
            </div>
        </div>`;

        const taskPriorityColor = taskDiv.querySelector(".task-priority");

        switch (task["priority"]) {
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

        content.appendChild(taskDiv)
    })

    content.insertAdjacentHTML("beforeend", `
        <h2 id="add-task-btn"><i class="fa-solid fa-circle-plus"></i> Add Task</h2>
        <form action="#" class="add-task-form" id="task-form">
            <input type="text" placeholder="Title" id="title-form" required>
            <input type="text" placeholder="Project" id="project-task-form" required>
            <input type="date" name="dueDate-form" id="dueDate-form" required>
            <select name="priority-form" id="priority-form" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button type="submit">Add</button>
            <button id="form-task-cancel">Cancel</button>
        </form>
    `)
}

export { loadTasks };