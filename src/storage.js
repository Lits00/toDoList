export default class Storage {
    constructor() {
        this.inbox = []
        this.today = []
        this.weekly = []
        this.projects = []
    }

    addTask(task) {
        if (!this.checkList(task)) {
            this.inbox.push(task);
            this.inbox.sort((a, b) => this.sortDate(a.dueDate, b.dueDate));
            this.today = this.inbox.filter(task => this.dueToday(task.dueDate));
            this.weekly = this.inbox.filter(task => this.weeklyDue(task.dueDate));
        } else {
            alert(`Task already exist.`);
        }
    }

    updateTask(taskName, dueDate) {
        const taskIndex = this.inbox.findIndex(task => task.name === taskName && task.dueDate === dueDate)
        const taskStatus = this.inbox[taskIndex].status
        this.inbox[taskIndex].status = taskStatus ? false : true
    }

    deleteTask(taskName, dueDate) {
        const taskIndex = this.inbox.findIndex(task => task.name === taskName && task.dueDate === dueDate)
        this.inbox.splice(taskIndex, 1)
        this.today = this.inbox.filter(task => this.dueToday(task.dueDate));
        this.weekly = this.inbox.filter(task => this.weeklyDue(task.dueDate));
    }

    addProject(project) {
       (!this.checkProject(project)) ? this.projects.push(project) : alert('Project name already exist!')
    }

    deleteProject(projectName) {
        const projectIndex = this.projects.findIndex(project => project.name === projectName)
        this.projects.splice(projectIndex, 1)
    }

    addProjectTask(projName, task) {
        const currentProject = this.getProject(projName);
        if(!this.checkProjectTask(projName, task)) {
            currentProject.tasks.push(task);
            currentProject.tasks.sort((a, b) => this.sortDate(a.dueDate, b.dueDate));
        } else {
            alert(`Task already exist.`);
        }
    }

    updateProjectTask(projName, taskName, dueDate) {
        const currentProject = this.getProject(projName)
        const taskIndex = currentProject.tasks.findIndex(task => task.name === taskName && task.dueDate === dueDate)
        const taskStatus = currentProject.tasks[taskIndex].status
        currentProject.tasks[taskIndex].status = taskStatus ? false : true;
    }

    deleteProjectTask(projName, taskName, dueDate) {
        const currentProject = this.getProject(projName)
        const taskIndex = currentProject.tasks.findIndex(task => task.name === taskName && task.dueDate === dueDate)
        currentProject.tasks.splice(taskIndex, 1)
    }

    getProject(projName) {
        const projIndex = this.projects.findIndex(project => project.name === projName);
        return this.projects[projIndex];
    }

    sortDate(a, b) {
        return new Date(a).valueOf() - new Date(b).valueOf();
    }

    dueToday(taskDate) {
        const currentDate = new Date();
        const dueDate = new Date(taskDate);
        return dueDate.toDateString() === currentDate.toDateString();
    }

    weeklyDue(taskDate) {
        const currentDate = new Date();
        const currentWeekDay = currentDate.getDay();

        // get the month's current week start
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentWeekDay);
        // get the month's following week start
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentWeekDay));

        const dueDate = new Date(taskDate);
        return dueDate >= startDate && dueDate <= endDate; // returns the task object if the dueDate is within the current week
    }

    checkList(task) {
       return this.inbox.some(todo => todo.name === task.name && todo.dueDate === task.dueDate)
    }

    checkProject(project) {
        return this.projects.some(obj => obj.name === project.name)
    }

    checkProjectTask(projName, task) {
        const currentProj = this.getProject(projName)
        return currentProj.tasks.some(todo => todo.name === task.name && todo.dueDate === task.dueDate)
    }
}