import * as app from './appFunc';

const displayUI = () => {
    // buttons
    const menu = document.getElementById('menu');
    const inbox = document.getElementById('inbox');
    const today = document.getElementById('today');
    const weekly = document.getElementById('weekly');

    // tasks
    const contentTitle = document.getElementById('content-name');
    const taskContainer = document.getElementById('task-container');
    const addTaskForm = document.getElementById('add-task-form');
    const addTaskPopup = document.getElementById('add-task-popup');
    const addTaskBtn = document.getElementById('add-task-btn');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');

    // projects
    const projectContainer = document.getElementById('projects');
    const addProjPopup = document.getElementById('add-proj-popup');
    const addProjForm = document.getElementById('add-proj-form');
    const addProjBtn = document.getElementById('add-proj-btn');
    const cancelProjBtn = document.getElementById('cancel-proj-btn');
    const delProjBtn = document.getElementById('delete-project');

    app.retrieveList();
    app.displayTasks();
    app.displayProjects();

    // toggle sidebar
    menu.addEventListener('click', () => {
        const container = document.getElementById('container');
        const menuList = document.getElementById('menu-list');
        container.classList.toggle('set-container');
        menuList.classList.toggle('hidden');
    })

    // display all task
    inbox.addEventListener('click', () => {
        displayInbox();
    })

    // display today's task
    today.addEventListener('click', () => {
        contentTitle.textContent = "Today";
        delProjBtn.classList.add('hidden')
        sidebarFunc();
        app.displayTasks();
    })

    // display weekly task
    weekly.addEventListener('click', () => {
        contentTitle.textContent = "This Week";
        delProjBtn.classList.add('hidden')
        sidebarFunc();
        app.displayTasks();
    })

    addTaskPopup.addEventListener('click', () => {   
        addTaskPopup.classList.remove('active');
        addTaskPopup.classList.toggle('button-active');
        addTaskForm.classList.remove('hidden');
        addTaskForm.classList.add('active');
    })

    addTaskBtn.addEventListener('click', () => {
        const title = contentTitle.textContent;
        taskPopup();
        if(title === 'Inbox'){     
            app.createTask();
            app.displayTasks();
        } else {
            app.createProjectTask(title)
            app.loadProjectTasks(title)
        }
    })

    cancelTaskBtn.addEventListener('click', () => {
        taskPopup();
    })

    taskContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('status')) {
            const taskDetails = event.target.nextElementSibling;
            const taskTitle = taskDetails.querySelector('.taskTitle').textContent;
            const taskDueDate = taskDetails.querySelector('.taskDuedate').textContent;
            const currentTab = contentTitle.textContent;
            if(currentTab === 'Inbox' || currentTab === 'Today' || currentTab === 'This Week') {
                app.updateTodo(taskTitle, taskDueDate);
            } else {
                app.updateProjTask(currentTab, taskTitle, taskDueDate);
            }
        } else if (event.target.classList.contains('deleteTask')) {
            const task = event.target.closest('.task');
            const taskDetails = task.querySelector('.task-details');
            const name = taskDetails.querySelector('.taskTitle').textContent;
            const date = taskDetails.querySelector('.taskDuedate').textContent;
            const currentTab = contentTitle.textContent;
            if(currentTab === 'Inbox' || currentTab === 'Today' || currentTab === 'This Week') {
                app.deleteTodo(name, date)
            } else {
                app.deleteProjTodo(currentTab, name, date)
            }
        }
    })

    addProjPopup.addEventListener('click', () => {
        addProjPopup.classList.remove('active');
        addProjPopup.classList.toggle('button-active');
        addProjForm.classList.remove('hidden');
        addProjForm.classList.add('active');
    })

    addProjBtn.addEventListener('click', () => {
        app.createProject();
        projPopup();
        app.displayProjects();
    })

    cancelProjBtn.addEventListener('click', () => {
        projPopup();
    })
    
    delProjBtn.addEventListener('click', () => {
        const project = contentTitle.textContent;
        app.removeProject(project);
        app.displayProjects();
        displayInbox();
    })

    projectContainer.addEventListener('click', (event) => {
        if(event.target.tagName === 'BUTTON') {
            const projectName = event.target.textContent;
            contentTitle.textContent = projectName;
            const btnStatus = delProjBtn.classList.contains('hidden');
            if(btnStatus) delProjBtn.classList.remove('hidden');
            app.loadProjectTasks(projectName);
            addTaskPopup.classList.add('active');
            addTaskPopup.classList.remove('hidden');
            addTaskForm.classList.remove('active');
            addTaskForm.classList.add('hidden');
            if(addTaskPopup.classList.contains('button-active')) addTaskPopup.classList.toggle('button-active');
        } else {
            return
        }
    })

    const displayInbox = () => {
        contentTitle.textContent = "Inbox";
        addTaskPopup.classList.add('active');
        addTaskPopup.classList.remove('hidden');
        addTaskForm.classList.remove('active');
        addTaskForm.classList.add('hidden');
        delProjBtn.classList.add('hidden')
        if(addTaskPopup.classList.contains('button-active')) addTaskPopup.classList.toggle('button-active');
        app.displayTasks();
    }

    const sidebarFunc = () => {
        addTaskPopup.classList.add('hidden');
        addTaskPopup.classList.remove('active');
        addTaskForm.classList.remove('active');
        addTaskForm.classList.add('hidden');
    }

    const taskPopup = () => {
        addTaskPopup.classList.remove('active');
        addTaskPopup.classList.toggle('button-active');
        addTaskForm.classList.remove('active');
        addTaskForm.classList.add('hidden');
    }

    const projPopup = () => {
        addProjPopup.classList.remove('active');
        addProjPopup.classList.toggle('button-active');
        addProjForm.classList.remove('active');
        addProjForm.classList.add('hidden');
    }
};

export default displayUI;