const form = document.querySelector('#task-form');
const inputTask = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
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

    inputTask.value = "";

    e.preventDefault();
}
