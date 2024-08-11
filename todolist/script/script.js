
// Function to get the current date and time
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

// Function to add a new task
function addTask(taskText) {
    const taskItem = document.createElement('li');
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');

    const taskName = document.createElement('span');
    taskName.textContent = taskText;
    taskDetails.appendChild(taskName);

    const taskTime = document.createElement('span');
    taskTime.classList.add('task-time');
    taskTime.textContent = `Added on: ${getCurrentDateTime()}`;
    taskDetails.appendChild(taskTime);

    taskItem.appendChild(taskDetails);

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => completeTask(taskItem));
    taskItem.appendChild(completeBtn);

    const star = document.createElement('div');
    star.classList.add('star');
    taskItem.appendChild(star);

    document.getElementById('todo-tasks').appendChild(taskItem);
}

// Function to complete a task
function completeTask(taskItem) {
    const completedList = document.getElementById('completed-tasks');
    const taskTime = taskItem.querySelector('.task-time');
    taskTime.textContent = `Completed on: ${getCurrentDateTime()}`;
    completedList.appendChild(taskItem);
    taskItem.classList.add('completed');
    taskItem.querySelector('.complete-btn').remove();
}

// Event listener for adding tasks
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Additional JavaScript features
// Add more than 15 operations here
// For example, implement sorting, filtering, saving tasks to local storage, etc.

// Task filtering by date (example operation)
function filterTasksByDate(date) {
    const tasks = document.querySelectorAll('#todo-tasks li, #completed-tasks li');
    tasks.forEach(task => {
        const taskTime = task.querySelector('.task-time').textContent;
        if (taskTime.includes(date)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

// Task sorting by time (another operation)
function sortTasksByTime() {
    const todoTasks = document.querySelector('#todo-tasks');
    const completedTasks = document.querySelector('#completed-tasks');
    sortTaskList(todoTasks);
    sortTaskList(completedTasks);
}

function sortTaskList(taskList) {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const timeA = new Date(a.querySelector('.task-time').textContent.split(': ')[1]);
        const timeB = new Date(b.querySelector('.task-time').textContent.split(': ')[1]);
        return timeA - timeB;
    });
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
}

// Implement localStorage to save tasks persistently
function saveTasksToLocalStorage() {
    const todoTasks = document.getElementById('todo-tasks').innerHTML;
    const completedTasks = document.getElementById('completed-tasks').innerHTML;
    localStorage.setItem('todoTasks', todoTasks);
    localStorage.setItem('completedTasks', completedTasks);
}

function loadTasksFromLocalStorage() {
    const todoTasks = localStorage.getItem('todoTasks');
    const completedTasks = localStorage.getItem('completedTasks');
    if (todoTasks) document.getElementById('todo-tasks').innerHTML = todoTasks;
    if (completedTasks) document.getElementById('completed-tasks').innerHTML = completedTasks;
}

// Run on page load
window.onload = function() {
    loadTasksFromLocalStorage();
    // Add other operations to be executed on load
};

window.onbeforeunload = saveTasksToLocalStorage;

// Continue adding more features and operations as needed...
