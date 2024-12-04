class Node {
    constructor(task, date, priority) {
        this.task = task;
        this.date = date;
        this.priority = priority;
        this.next = null;
    }
}

class TaskLinkedList {
    constructor() {
        this.head = null;
    }

    addTask(task, date, priority) {
        const newNode = new Node(task, date, priority);
        
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    deleteTask(task) {
        if (!this.head) return;

        if (this.head.task === task) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.task === task) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    getAllTasks() {
        const tasks = [];
        let current = this.head;
        
        while (current) {
            tasks.push({
                task: current.task,
                date: current.date,
                priority: current.priority
            });
            current = current.next;
        }
        
        return tasks;
    }
}