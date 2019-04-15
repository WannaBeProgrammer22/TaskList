// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all even listeners
loadEventListeners();

function loadEventListeners() {

    // DOM load event - trigger when the dom loaded
    document.addEventListener('DOMContentLoaded', getTasks);

    // add task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTasks);

    // filter tasks event
    filter.addEventListener('keyup', filterTask);
}

// get tasks from local storage
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create a delete link to li
        const link = document.createElement('a');
        // add class
        link.className = 'delete-item secondary-content';

        // add href to be the icon clickable
        link.href = "#";

        // add icon x
        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append link to li
        li.appendChild(link);

        // append li to ul
        taskList.appendChild(li);
    });

}

function addTask(e) {

    if (taskInput.value === '') {
        alert('add a task');
    }

    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create a delete link to li
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';

    // add href to be the icon clickable
    link.href = "#";

    // add icon x
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = "";

    e.preventDefault();
}

// Store task to local storage
function storeTaskInLocalStorage(task) {

    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {

    // check if the clicked element and check if the parent link has a delete item
    if (e.target.parentElement.classList.contains("delete-item")) {
        // get the text of the li
        const task = e.target.parentElement.parentElement.textContent;
        if (confirm(`Are you sure to delete "${task}" task?`)) {
            e.target.parentElement.parentElement.remove();

            // remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // loop all the tasks in the localstorage and check the tasksitem parameter to all the tasks list in if match then delete using splice
    tasks.forEach(function (task, i) {
        if (taskItem.textContent === task) {
            tasks.splice(i, 1);
        }
    });

    // set again
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks
function clearTasks() {
    // one way to do it. make the ul content element to be clear
    // taskList.innerHTML = '';

    // faster by looping
    if (confirm('Are you sure you want to delete all tasks?')) {
        while (taskList.firstChild) {
            console.log(taskList.firstChild)
            taskList.removeChild(taskList.firstChild);
        }
    }

    //or by using loop and remove()

    // if (taskList.children.length !== 0) {

    // lisDelete.forEach(function (x) {
    //     x.remove();
    // })

    // let lisDelete = Array.from(taskList.children);

    // for (let i = 0; i < lisDelete.length; i++) {
    //     lisDelete[i].remove();
    // }

    // let i = 0;
    // while (i < lisDelete.length) {
    //     lisDelete[i].remove();
    //     i++;
    // }

    // }

    // Clear all from LS
    clearTasksFromLocalStorage();
}

// clear taks from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


// Filter the task list
function filterTask(e) {
    // get the value of filter text box and lower case it for better comparing
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        // this is a string
        const item = task.firstChild.textContent;
        // checking if the input text is inside the li text content
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}