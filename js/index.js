import { Todos } from "./class/Todos.js";

const BACKEND_URL = "http://localhost:3002";
const todos = new Todos(BACKEND_URL);

const list = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.getElementById("taskForm"); // Reference to the form

input.disabled = true;

// Function to add a new task
const addNewTask = () => {
    const taskText = input.value.trim();
    if (taskText !== "") {
        todos.addTask(taskText)
            .then((task) => {
                renderTask(task);
                input.value = "";
                input.focus();
            })
            .catch((error) => {
                alert("Error adding task: " + error);
            });
    }
};

// Function to render a task
const renderTask = (task) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    li.setAttribute("data-key", task.getTaskId().toString());

    const span = document.createElement("span");
    span.innerText = task.getTaskText();
    li.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.addEventListener("click", () => removeTask(task.getTaskId()));

    li.appendChild(deleteBtn);
    list.appendChild(li);
};

// Function to delete a task
const removeTask = (id) => {
    todos.removeTask(id)
        .then((removedId) => {
            const li = document.querySelector(`[data-key='${removedId}']`);
            if (li) list.removeChild(li);
        })
        .catch((error) => alert("Error deleting task: " + error));
};

// Fetch tasks from backend
const getTaskList = () => {
    todos.getTasks()
        .then((tasks) => {
            tasks.forEach(renderTask);
            input.disabled = false;
        })
        .catch((error) => alert("Error fetching tasks: " + error));
};

// Attach event listener to the form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewTask();
});

// Load tasks on page load
getTaskList();
