const addTask = (/*title, description, priority, dueDate, project*/) => {
    const toDo = JSON.parse(localStorage.getItem('todo'));
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const dueDate = document.getElementById('due-date').value;
    const project = document.getElementById('project-select').value;
    toDo.push({ title, description, priority, dueDate, project }) ;
    console.log(toDo);
    localStorage.setItem('todo', JSON.stringify(toDo));
}

const addTodoList = () => {
    if(!localStorage.getItem('todo')){
        const toDo = [];
        localStorage.setItem('todo', JSON.stringify(toDo));
    }
}

const test = () => {
    localStorage.setItem('todo', JSON.stringify({title: 'Gym', description: 'Go to gym', priority: 'medium', dueDate: '2022-23-01', project: 'inbox'}))
}



export { addTask, addTodoList}