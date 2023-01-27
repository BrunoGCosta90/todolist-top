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


export { addTask, addTodoList}