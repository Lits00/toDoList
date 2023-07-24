import Storage from "./storage";
import Task from "./task";
import Project from "./project";

const storage = new Storage();

export const createTask = () => {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('task-date').value;

    if(taskName === '' || dueDate === ''){
        alert('Please fill-up all required information.');
        resetTaskForm();
    } else {
        const newTask = new Task(taskName, dateFormat(dueDate));
        storage.addTask(newTask); // saves task to storage object (not locally stored)
        saveList(); // saves storage object to localStorage
        resetTaskForm(); 
    }
}

export const updateTodo = (taskName, dueDate) => {
    storage.updateTask(taskName, dueDate);
    saveList();
    displayTasks();
}

export const deleteTodo = (taskName, dueDate) => {
    storage.deleteTask(taskName, dueDate);
    saveList();
    displayTasks();
}

export const createProject = () => {
    const projName = document.getElementById('proj-name').value;
    
    if(projName === ''){
        alert("Project name can't be empty!")
    } else {
        const newProject = new Project(projName);
        storage.addProject(newProject);
        saveList();
        resetProjForm();
    }
}

export const removeProject = (project) => {
    storage.deleteProject(project);
    saveList();
}

export const createProjectTask = (projName) => {
    const taskName = document.getElementById('task-name').value;
    const dueDate = document.getElementById('task-date').value;

    if(taskName === '' || dueDate === ''){
        alert('Please fill-up all required information.');
        resetTaskForm();
    } else {
        const task = new Task(taskName, dateFormat(dueDate));
        storage.addProjectTask(projName, task);
        saveList();
        resetTaskForm();
    }
}

export const updateProjTask = (projName, taskName, dueDate) => {
    storage.updateProjectTask(projName, taskName, dueDate);
    saveList();
    loadProjectTasks(projName);
}

export const deleteProjTodo = (projName, taskName, dueDate) => {
    storage.deleteProjectTask(projName, taskName, dueDate);
    saveList();
    loadProjectTasks(projName);
}

const resetTaskForm = () => {
    document.getElementById('task-name').value = "";
    document.getElementById('task-date').value = "";
}

const resetProjForm = () => {
    document.getElementById('proj-name').value = "";
}

const saveList = () => {
    localStorage.setItem('todo', JSON.stringify(storage));
}

export const retrieveList = () => {
    const todo = JSON.parse(localStorage.getItem('todo'));
    if(todo) {
        todo.inbox.map(task => storage.addTask(convertTask(task)));
        todo.projects.map(project => storage.addProject(project))
    } else {
        storage.inbox = [];
        storage.today = [];
        storage.weekly = [];
        storage.projects = [];
    }
}

const convertTask = (todo) => {
    return new Task(todo.name, todo.dueDate);
}

const dateFormat = (taskDate) => {
    const date = new Date(taskDate);

    let monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let month = monthNames[date.getMonth()];
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear().toString();

    const fullDate = `${month} ${day}, ${year}`;
    return fullDate
}

const generateTask = (taskName, taskDue, taskStatus) => {
    const taskContainer = document.getElementById('task-container')

    const taskFile = document.createElement('div');
    taskFile.classList.add('task', 'task-file', 'd-flex');

    const checkbox = document.createElement('input');
    checkbox.type ='checkbox';
    checkbox.name = 'status';
    checkbox.classList.add('status')

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details', 'd-flex');
    const taskTitle = document.createElement('p');
    taskTitle.textContent = taskName;
    const taskDueDate = document.createElement('p');
    taskDueDate.textContent = taskDue;
    if(taskStatus) {
        taskTitle.classList.add('taskTitle', 'crossed');
        taskDueDate.classList.add('taskDuedate', 'crossed');
        checkbox.checked = true
    } else {
        taskTitle.classList.add('taskTitle');
        taskDueDate.classList.add('taskDuedate');
        checkbox.checked = false
    }

    const deleteTask = document.createElement('button');    
    deleteTask.classList.add('deleteTask', 'no-margin');
    deleteTask.innerHTML = '&times;';

    taskContainer.appendChild(taskFile);
    taskFile.append(checkbox, taskDetails, deleteTask);
    taskDetails.append(taskTitle, taskDueDate);
}

export const displayTasks = () => {
    const title = document.getElementById('content-name')
    const taskContainer = document.getElementById('task-container')
    taskContainer.innerHTML = '';
    switch (title.textContent) {
        case "Inbox":
            storage.inbox.forEach( task => generateTask(task.name, task.dueDate, task.status))
            break;
        case "Today":
            storage.today.forEach( task => generateTask(task.name, task.dueDate, task.status))
            break;
        case "This Week":
            storage.weekly.forEach( task => generateTask(task.name, task.dueDate, task.status))
    }
}

const generateProject = (projName) => {
    const projectContainer = document.getElementById('projects');

    const projBtn = document.createElement('button');
    projBtn.textContent = projName;

    projectContainer.appendChild(projBtn)
}

// load projects to sidebar
export const displayProjects = () => {
    const projectContainer = document.getElementById('projects')
    projectContainer.innerHTML = '';
    storage.projects.forEach( project => generateProject(project.name));
}

// load tasks of a project
export const loadProjectTasks = (projName) => {
    const taskContainer = document.getElementById('task-container')
    taskContainer.innerHTML = '';
    const currentProj = storage.getProject(projName)
    currentProj.tasks.forEach(task => generateTask(task.name, task.dueDate, task.status))
}