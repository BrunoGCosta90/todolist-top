import { format, parseISO, isSameWeek } from "date-fns";
import TrashIcon from '../icons/trash-can-outline.svg';


const addTask = (/*title, description, priority, dueDate, project*/) => {
    const toDo = JSON.parse(localStorage.getItem('todo'));
    const tittle = document.getElementById('task-tittle-input');
    const description = document.getElementById('task-description');
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const dueDate = document.getElementById('due-date').value;
    const project = document.getElementById('project-select').value;
    const finished = false;
    for (let i = 0; i < toDo.length; i++) {
        if (toDo[i].tittle == tittle.value) {
            taskNameError();
            return;
        }
    }

    toDo.push({ tittle: tittle.value, description: description.value, priority, dueDate, project, finished });
    console.log(toDo);
    localStorage.setItem('todo', JSON.stringify(toDo));
    drawTask(tittle.value, description.value, priority, dueDate, project, finished);

    tittle.value = '';
    description.value = '';
    document.getElementById('medium').checked = true;
    document.getElementById('modal-task').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');

}

const addTodoList = () => {
    if (!localStorage.getItem('todo')) {
        const toDo = [];
        localStorage.setItem('todo', JSON.stringify(toDo));
    }
}

const taskNameError = () => {
    const errorModal = document.getElementById('task-name-error-modal');
    errorModal.classList.add('active');
}

const addTasksToPage = (projectTittle) => {
    const toDo = JSON.parse(localStorage.getItem('todo'));
    if (toDo[0] != undefined) {
        if (projectTittle == "Inbox") {
            for (let i = 0; i < toDo.length; i++) {
                drawTask(toDo[i].tittle, toDo[i].description, toDo[i].priority, toDo[i].dueDate, toDo[i].project, toDo[i].finished);
            }
        } else if (projectTittle == 'Today') {
            const currentDate = format(new Date(), 'yyyy-MM-dd');
            for (let i = 0; i < toDo.length; i++) {
                if (currentDate == toDo[i].dueDate) {
                    drawTask(toDo[i].tittle, toDo[i].description, toDo[i].priority, toDo[i].dueDate, toDo[i].project, toDo[i].finished);
                }

            }

        } else if (projectTittle == 'Week') {
            for (let i = 0; i < toDo.length; i++) {
                console.log(isSameWeek(new Date(), parseISO(toDo[i].dueDate)));
                if (isSameWeek(new Date(), parseISO(toDo[i].dueDate))) {
                    drawTask(toDo[i].tittle, toDo[i].description, toDo[i].priority, toDo[i].dueDate, toDo[i].project, toDo[i].finished);
                }

            }
        } else {
            for (let i = 0; i < toDo.length; i++) {
                if (toDo[i].project == projectTittle) {
                    drawTask(toDo[i].tittle, toDo[i].description, toDo[i].priority, toDo[i].dueDate, toDo[i].project, toDo[i].finished);
                }
            }
        }
    }
}

const drawTask = (tittle, description, priority, dueDate, project, finished) => {
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
        default:
            break;
    }
    taskHeader.appendChild(taskPriorityBar);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    taskHeader.appendChild(checkbox);

    if (finished == true) {
        checkbox.checked = true;
        task.classList.add('finished');
    }

    checkbox.addEventListener('click', (e) => {
        const toDo = JSON.parse(localStorage.getItem('todo'))
        const getTaskName = e.currentTarget.nextSibling.textContent;
        if (e.currentTarget.parentElement.parentElement.classList.contains('finished')) {
            e.currentTarget.parentElement.parentElement.classList.remove('finished');
            for (let i = 0; i < toDo.length; i++) {
                if (toDo[i].tittle == getTaskName) {
                    toDo[i].finished = false;
                    localStorage.setItem('todo', JSON.stringify(toDo));
                    return;
                }
            }
        } else {
            e.currentTarget.parentElement.parentElement.classList.add('finished');
            for (let i = 0; i < toDo.length; i++) {
                if (toDo[i].tittle == getTaskName) {
                    toDo[i].finished = true;
                    localStorage.setItem('todo', JSON.stringify(toDo));
                    return;
                }
            }
        }

    })

    const taskTittle = document.createElement('div');
    taskTittle.textContent = tittle;
    taskTittle.classList.add('task-tittle')
    taskTittle.id = 'task-tittle';
    taskHeader.appendChild(taskTittle);
    const trashButton = new Image();
    trashButton.src = TrashIcon;
    trashButton.addEventListener('click', (e) => {
        const thisTask = e.currentTarget.parentElement.parentElement;
        const taskTittle = e.currentTarget.parentElement.childNodes[2].textContent;
        const todo = JSON.parse(localStorage.getItem('todo'));
        for (let i = 0; i < todo.length; i++) {
            if (todo[i].tittle == taskTittle) {
                todo.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('todo', JSON.stringify(todo));
        if (thisTask.previousSibling.textContent == '!' && thisTask.previousSibling != null) {
            thisTask.previousSibling.remove();
        }
        thisTask.remove();
    })
    taskHeader.appendChild(trashButton);


    const taskBody = document.createElement('div');
    taskBody.classList.add('task-body');
    task.appendChild(taskBody);

    taskHeader.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            return;
        }
        if (e.currentTarget.nextSibling.childNodes.length < 1) {
            e.currentTarget.classList.add('expanded-task');
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
            taskDueDate.classList.add('task-due-date');
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
            e.currentTarget.classList.remove('expanded-task');
            while (e.currentTarget.nextSibling.childNodes.length > 0) {
                e.currentTarget.nextSibling.removeChild(e.currentTarget.nextSibling.firstChild);
            }
        }
    });
    tasksContainer.appendChild(task);
}

const checkPastDueDate = () => {
    const tasks = JSON.parse(localStorage.getItem('todo'));
    const tasksContainer = document.getElementById('tasks-container');

    for (let task of tasksContainer.querySelectorAll('.task-div')) {
        for (let i = 0; i < tasks.length; i++) {
            if (task.firstChild.textContent == tasks[i].tittle) {            
                if (tasks[i].dueDate < format(new Date(), "yyyy-MM-dd")) {
                    addWarning(task);
                }
            }
        }
    }


}

const addWarning = (task) => {

    const warningDiv = document.createElement('div');
    warningDiv.textContent = "!";
    warningDiv.classList.add('past-due');
    warningDiv.title = "Past due!";
    const tasksContainer = document.getElementById('tasks-container');
    if (task.classList.contains('expired')) {
        return;
    } else {
        task.classList.add('expired');
        tasksContainer.insertBefore(warningDiv, task);
    }

}

const cleanTasksContainer = () => {
    const tasksContainer = document.getElementById('tasks-container');
    while (tasksContainer.childNodes.length > 0) {
        tasksContainer.firstChild.remove();
    }
}


export { addTask, addTodoList, addTasksToPage, checkPastDueDate, cleanTasksContainer }