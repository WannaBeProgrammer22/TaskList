const form = document.querySelector('#task-form');
const inputTask = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', deleteTask);

    filter.addEventListener('keyup', filterTasks);

    clearBtn.addEventListener('click', clearTasks);
}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === '' || localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = "<i class='fa fa-remove'></i>";
        link.href = "#";

        li.appendChild(link);

        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (inputTask.value === null || inputTask.value === '') {
        alert('Add a Task');
        return false;
    }

    const li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(inputTask.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = "<i class='fa fa-remove'></i>";
    link.href = "#";

    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskFromLocalStorage(inputTask.value);

    inputTask.value = "";

    e.preventDefault();
}

function storeTaskFromLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === '' || localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();

            deleteFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

function deleteFromLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === '' || localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.splice(tasks.indexOf(task.textContent), 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        if (task.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function clearTasks(e) {
    if (confirm('Are you sure you want to clear all the saved tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTaskFromLocalStorage();

    e.preventDefault();
}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}