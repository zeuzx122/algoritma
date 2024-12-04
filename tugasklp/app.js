const taskList = new TaskLinkedList();
const mlPriority = new TaskPriorityML();
let currentFilter = 'all';

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const prioritySelect = document.getElementById('prioritySelect');
    
    if (!taskInput.value || !dateInput.value) return;

    let priority;
    if (prioritySelect.value === 'auto') {
        priority = mlPriority.calculatePriority(dateInput.value);
    } else {
        priority = prioritySelect.value;
    }

    taskList.addTask(taskInput.value, dateInput.value, priority);
    updateTaskDisplay();
    
    taskInput.value = '';
    dateInput.value = '';
}

function deleteTask(task) {
    taskList.deleteTask(task);
    updateTaskDisplay();
}

function filterTasks(filter) {
    currentFilter = filter;
    updateTaskDisplay();
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function updateTaskDisplay() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';
    
    const tasks = taskList.getAllTasks();
    const filteredTasks = tasks.filter(task => {
        return currentFilter === 'all' || task.priority === currentFilter;
    });

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        
        const date = new Date(task.date).toLocaleString();
        
        taskElement.innerHTML = `
            <div>
                <span>${task.task}</span>
                <span style="margin-left: 10px; color: #666;">${date}</span>
            </div>
            <div>
                <span class="priority-tag priority-${task.priority}">${task.priority}</span>
                <button class="delete-btn" onclick="deleteTask('${task.task}')">Delete</button>
            </div>
        `;
        
        taskListElement.appendChild(taskElement);
    });
}