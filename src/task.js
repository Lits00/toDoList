export default class Task {
    constructor(name, dueDate, status = false){
        this.name = name
        this.dueDate = dueDate
        this.status = status
    }
}