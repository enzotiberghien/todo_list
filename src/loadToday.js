import { editTask, tasks } from "./task.js";
import { deleteBtnEvent } from "./index.js";

const content = document.querySelector("#content")

function loadToday() {
    const tasksDiv = document.querySelectorAll(".task");
    tasksDiv.forEach(task => {
        if (new Date().getDate() !== new Date(task.querySelector(".task-date").textContent).getDate()) {
            task.style.display = "none";
        } else task.style.display = "flex";
    })
}

export { loadToday };