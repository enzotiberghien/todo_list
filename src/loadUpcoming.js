import { editTask, tasks } from "./task.js";
import { deleteBtnEvent } from "./index.js";

const content = document.querySelector("#content")

function loadUpcoming() {
    const tasksDiv = document.querySelectorAll(".task");
    tasksDiv.forEach(task => {
        if (new Date().getTime() >= new Date(task.querySelector(".task-date").textContent).getTime()) {
            task.style.display = "none";
        } else task.style.display = "flex";
    })
}

export { loadUpcoming };