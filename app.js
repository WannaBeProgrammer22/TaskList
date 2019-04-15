// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all even listeners
loadEventListeners();

function loadEventListeners() {

    // Add task event
    form.addEventListener('submit', addTask);

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
    link.innerHTML = '<i class="fa fa-remove"></i>'

    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    // clear input
    taskInput.value = "";

    e.preventDefault();
}