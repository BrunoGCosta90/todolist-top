const addTask = (/*title, description, priority, dueDate, project*/) => {
    const toDo = JSON.parse(localStorage.getItem('todo'));
    const tittle = document.getElementById('task-tittle');
    const description = document.getElementById('task-description');
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const dueDate = document.getElementById('due-date').value;
    const project = document.getElementById('project-select').value;

    for (let i = 0; i < toDo.length; i++){
        if (toDo[i].tittle == tittle){
            taskNameError();
            //break;
            return;
        }
    }

    toDo.push({ tittle: tittle.value, description: description.value, priority, dueDate, project, finished: false }) ;
    console.log(toDo);
    localStorage.setItem('todo', JSON.stringify(toDo));
    drawTask(tittle.value, description.value, priority, dueDate, project);

    tittle.value = '';
    description.value = '';
    document.getElementById('medium').checked = true;
    document.getElementById('modal-task').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    
}

const addTodoList = () => {
    if(!localStorage.getItem('todo')){
        const toDo = [];
        localStorage.setItem('todo', JSON.stringify(toDo));
    }
}

const taskNameError = () => {
    const errorModal = document.getElementById('task-name-error-modal');
    errorModal.classList.add('active');
}

const addTasksToPage = () => {
    const toDo = JSON.parse(localStorage.getItem('todo'));
    if (toDo[0] != undefined) {
        for (let i = 0; i < toDo.length; i++) {
            drawTask(toDo[i].tittle, toDo[i].description, toDo[i].priority, toDo[i].dueDate, toDo[i].project);
        }
    }
}

const drawTask = (tittle, description, priority, dueDate, project) => {
    //console.log(tittle, description, priority, dueDate, project);
    const tasksContainer = document.getElementById('tasks-container');
    const task = document.createElement('div');
    task.classList.add('task-div');
    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');
    task.appendChild(taskHeader);
    const taskPriorityBar = document.createElement('div');
    taskPriorityBar.classList.add('task-priority-bar');
    switch (priority) {
        case 'Low':
            taskPriorityBar.style.backgroundColor = 'green';
            break;
        case 'Medium':
            taskPriorityBar.style.backgroundColor = 'yellow';
            break;
        case 'High':
            taskPriorityBar.style.backgroundColor = 'red';
            break;
        default :
            break;
    }
    taskHeader.appendChild(taskPriorityBar);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    taskHeader.appendChild(checkbox);
    const taskTittle = document.createElement('div');
    taskTittle.textContent = tittle;
    taskTittle.classList.add('task-tittle')
    taskHeader.appendChild(taskTittle);
    const taskBody = document.createElement('div');
    taskBody.classList.add('task-body');
    task.appendChild(taskBody);
    taskHeader.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-checkbox')){
            return;
        }
        if (e.currentTarget.nextSibling.childNodes.length < 1) {
            e.currentTarget.classList.add('expanded');
            const taskDescription = document.createElement('div');
            taskDescription.textContent = description;
            taskDescription.classList.add('task-description');
            taskBody.appendChild(taskDescription);
            const taskPriorityContainer = document.createElement('div');
            taskPriorityContainer.classList.add('task-containers');
            taskBody.appendChild(taskPriorityContainer);
            const taskPriorityLabel = document.createElement('label');
            taskPriorityLabel.textContent = 'Priority:';
            taskPriorityContainer.appendChild(taskPriorityLabel);
            const taskPriority = document.createElement('div');
            taskPriority.textContent = priority;
            taskPriorityContainer.appendChild(taskPriority);
            const taskDueDateContainer = document.createElement('div');
            taskDueDateContainer.classList.add('task-containers');
            taskBody.appendChild(taskDueDateContainer);
            const taskDueDateLabel = document.createElement('label');
            taskDueDateLabel.textContent = 'Due Date:';
            taskDueDateContainer.appendChild(taskDueDateLabel);
            const taskDueDate = document.createElement('input');
            taskDueDate.type = 'date';
            taskDueDate.value = dueDate;
            taskDueDate.disabled = true;
            taskDueDateContainer.appendChild(taskDueDate);
            const taskProjectContainer = document.createElement('div');
            taskProjectContainer.classList.add('task-containers');
            taskBody.appendChild(taskProjectContainer);
            const taskProjectLabel = document.createElement('label');
            taskProjectLabel.textContent = 'Project:';
            taskProjectContainer.appendChild(taskProjectLabel);
            const taskProject = document.createElement('div');
            taskProject.textContent = project;
            taskProjectContainer.appendChild(taskProject);
        } else {
            e.currentTarget.classList.remove('expanded');
            while (e.currentTarget.nextSibling.childNodes.length > 0){
                e.currentTarget.nextSibling.removeChild( e.currentTarget.nextSibling.firstChild);
            }
        }
    });
    tasksContainer.appendChild(task);
}

const expandTask = () => {

}

export { addTask, addTodoList, addTasksToPage}