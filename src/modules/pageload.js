import MenuIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import TodayIcon from '../icons/calendar-today.svg';
import UpcomingIcon from '../icons/calendar-month.svg';
import { addProject, updateProjectSelector } from './projectManagement.js';
import { times } from 'lodash';
import { getDate } from './getCurrentDate.js';
import { addTask, addTasksToPage, addTodoList, checkPastDueDate } from './taskManagement';
import { format } from 'date-fns';

const pageLoad = () => {
    let currentDate;
    addTodoList();
    if (!(localStorage.getItem('projects'))) {
        const projects = ['Inbox'];
        localStorage.setItem('projects', JSON.stringify(projects));
     }
    //test();
    //tittle
    //document.tittle = "ToDo";

    // header
    const header = document.createElement('header');
    const headerMenuIcon = new Image();
    headerMenuIcon.src = MenuIcon;
    header.appendChild(headerMenuIcon);
    const headerTittle = document.createElement('div');
    headerTittle.textContent = 'ToDo';
    header.appendChild(headerTittle);
    document.body.appendChild(header);

    //sidebar
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    sidebar.id = 'sidebar';
    document.body.appendChild(sidebar);

    const homeLabel = document.createElement('div');
    homeLabel.textContent = 'Home';
    sidebar.appendChild(homeLabel);

    const inboxButton = document.createElement('button');
    //inboxButton.textContent = 'Inbox';
    const inboxButtonIcon = new Image();
    inboxButtonIcon.src = InboxIcon;
    inboxButtonIcon.classList.add('icon');
    const inboxText = document.createElement('div');
    inboxText.textContent = 'Inbox';
    //const inboxButtonIcon = document.createElement('div');
    //inboxButtonIcon.textContent = 'Inbox';
    //inboxButtonIcon.classList.add('icon', 'icon-inbox');
    //inboxButton.classList.add('icon', 'icon-inbox');
    inboxButton.appendChild(inboxButtonIcon);
    inboxButton.appendChild(inboxText);
    sidebar.appendChild(inboxButton);

    const todayButton = document.createElement('button');
    const todayButtonIcon = new Image();
    todayButtonIcon.src = TodayIcon;
    todayButtonIcon.classList.add('icon');
    const todayText = document.createElement('div');
    todayText.textContent = 'Today';
    todayButton.appendChild(todayButtonIcon);
    todayButton.appendChild(todayText);
    sidebar.appendChild(todayButton);

    const upcomingButton = document.createElement('button');
    const upcomingButtonIcon = new Image();
    upcomingButtonIcon.src = UpcomingIcon;
    upcomingButtonIcon.classList.add('icon');
    const upcomingText = document.createElement('div');
    upcomingText.textContent = 'Upcoming';
    upcomingButton.appendChild(upcomingButtonIcon);
    upcomingButton.appendChild(upcomingText);
    sidebar.appendChild(upcomingButton);

    const projectsLabel = document.createElement('div');
    projectsLabel.textContent = 'Projects';
    projectsLabel.id = 'projectSection';
    sidebar.appendChild(projectsLabel);

    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = '+ Add project';
    addProjectButton.id = 'addProjectModalOpen';
    sidebar.appendChild(addProjectButton);

    //modal for adding project
    const addProjectModal = document.createElement('div');
    addProjectModal.classList.add('modal');
    addProjectModal.id = 'modal-project';
    const addProjectModalHeader = document.createElement('div');
    addProjectModalHeader.classList.add('modal-header');
    addProjectModal.appendChild(addProjectModalHeader);
    const addProjectModalTittle = document.createElement('div');
    addProjectModalTittle.classList.add('modal-tittle');
    addProjectModalTittle.textContent = 'Add Project';
    addProjectModalHeader.appendChild(addProjectModalTittle);
    const addProjectModalClose = document.createElement('button');
    addProjectModalClose.classList.add('close-button');
    addProjectModalClose.id = 'project-modal-close';
    addProjectModalHeader.appendChild(addProjectModalClose);
    const addProjectModalBody = document.createElement('div');
    addProjectModalBody.classList.add('modal-body');
    addProjectModal.appendChild(addProjectModalBody);
    

    document.body.appendChild(addProjectModal);

    //make button for opening/closing the modal for adding project
    const openModalButton = document.getElementById('addProjectModalOpen');
    const closeModalButton = document.getElementById('project-modal-close');
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    openModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-project');
        openModal(modal);
        checkPastDueDate();
    })

    overlay.addEventListener('click', () => {
        const openModals = document.querySelectorAll('.modal.active');
        openModals.forEach(modal => {
            closeModal(modal);
        })
    })

    closeModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-project');
        closeModal(modal);
    })

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active')
        overlay.classList.add('active')
    }

  
    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    //overlay div for open modal
    

    //main content
    const content = document.createElement('div');
    content.classList.add('content');
    content.id = 'content';
    document.body.appendChild(content);

    const addTaskButtonContainer = document.createElement('div');
    addTaskButtonContainer.classList.add('add-task-container');
    const addTaskModalButton = document.createElement('button');
    addTaskModalButton.id = 'addTaskModalOpen';
    //addTaskButton.classList.add('add-task');
    addTaskModalButton.textContent = '+ Add Task';
    

    addTaskButtonContainer.appendChild(addTaskModalButton);
    content.appendChild(addTaskButtonContainer);

    //modal for adding tasks
    const addTaskModal = document.createElement('div');
    addTaskModal.classList.add('modal');
    addTaskModal.id = 'modal-task';

    const addTaskModalHeader = document.createElement('div');
    addTaskModalHeader.classList.add('modal-header');
    addTaskModal.appendChild(addTaskModalHeader);

    const addTaskModalTittle = document.createElement('div');
    addTaskModalTittle.classList.add('modal-tittle');
    addTaskModalTittle.textContent = 'New Task';
    addTaskModalHeader.appendChild(addTaskModalTittle);

    const addTaskModalClose = document.createElement('button');
    addTaskModalClose.classList.add('close-button');
    addTaskModalClose.id = 'task-modal-close';
    addTaskModalHeader.appendChild(addTaskModalClose);

    const addTaskModalBody = document.createElement('div');
    addTaskModalBody.classList.add('modal-body');
    addTaskModalBody.id = 'add-task-modal-body';

    const taskForm = document.createElement('form');
    taskForm.id = 'add-task-form';

    const taskTittle = document.createElement('input');
    taskTittle.id = 'task-tittle-input';
    taskTittle.name = 'task-tittle-input';
    taskTittle.type = 'text';
    taskTittle.placeholder = 'Task tittle';
    taskTittle.required = true;
    taskForm.appendChild(taskTittle);

    const taskDescription = document.createElement('textarea');
    taskDescription.id = 'task-description';
    taskDescription.name = 'task-description';
    taskDescription.placeholder = 'Task description';
    taskDescription.maxLength = 385;
    taskDescription.required = true;
    taskForm.appendChild(taskDescription);

    const priorityContainer = document.createElement('div');
    priorityContainer.id = 'priority-container';

    const priorityLabel = document.createElement('label');
    priorityLabel.id = 'priority-label';
    priorityLabel.textContent = 'Priority';
    priorityContainer.appendChild(priorityLabel)

    const lowPrioInput = document.createElement('input');
    lowPrioInput.type = 'radio';
    lowPrioInput.name = 'priority';
    lowPrioInput.id = 'low';
    lowPrioInput.value = 'Low';
    const lowPrioLabel = document.createElement('label');
    lowPrioLabel.setAttribute('for', 'low');
    lowPrioLabel.textContent = 'Low';
    priorityContainer.appendChild(lowPrioInput);
    priorityContainer.appendChild(lowPrioLabel);

    const mediumPrioInput = document.createElement('input');
    mediumPrioInput.type = 'radio';
    mediumPrioInput.name = 'priority';
    mediumPrioInput.id = 'medium';
    mediumPrioInput.value = 'Medium';
    mediumPrioInput.checked = true;
    mediumPrioInput.required = true;
    const mediumPrioLabel = document.createElement('label');
    mediumPrioLabel.setAttribute('for', 'medium');
    mediumPrioLabel.textContent = 'Medium';
    priorityContainer.appendChild(mediumPrioInput);
    priorityContainer.appendChild(mediumPrioLabel);
    taskForm.appendChild(priorityContainer);
    //addProjectModalBody.textContent = 'asdasd'
    addTaskModalBody.appendChild(taskForm);
    addTaskModal.appendChild(addTaskModalBody);
    document.body.appendChild(addTaskModal);

    const highPrioInput = document.createElement('input');
    highPrioInput.type = 'radio';
    highPrioInput.name = 'priority';
    highPrioInput.id = 'high';
    highPrioInput.value = 'High';
    const highPrioLabel = document.createElement('label');
    highPrioLabel.setAttribute('for', 'high');
    highPrioLabel.textContent = 'High';
    priorityContainer.appendChild(highPrioInput);
    priorityContainer.appendChild(highPrioLabel);
    taskForm.appendChild(priorityContainer);
    //addProjectModalBody.textContent = 'asdasd'
    addTaskModalBody.appendChild(taskForm);
    addTaskModal.appendChild(addTaskModalBody);
    document.body.appendChild(addTaskModal);

    const dueDateContainer = document.createElement('div');
    dueDateContainer.id = 'due-date-container';
    taskForm.appendChild(dueDateContainer);
    
    const dueDateLabel = document.createElement('label');
    dueDateLabel.id = 'due-date-label'
    dueDateLabel.textContent = 'Due Date';
    dueDateContainer.appendChild(dueDateLabel);
    
    const dueDate = document.createElement('input');
    dueDate.id = 'due-date';
    dueDate.type = 'date';
    dueDateContainer.appendChild(dueDate);

    const projectSelectContainer = document.createElement('div');
    projectSelectContainer.id = 'project-select-container';
    const projectSelectLabel = document.createElement('label');
    projectSelectLabel.id = 'project-select-label';
    projectSelectLabel.textContent = 'Project';
    projectSelectContainer.appendChild(projectSelectLabel);
    const projectSelect = document.createElement('select');
    projectSelect.id = 'project-select';
    const inboxOption = document.createElement('option');
    inboxOption.value = 'Inbox';
    inboxOption.text = 'Inbox';
    projectSelect.add(inboxOption);
    projectSelectContainer.appendChild(projectSelect);
    taskForm.appendChild(projectSelectContainer);


    const addTaskButton = document.createElement('button');
    addTaskButton.id = 'add-task-button';
    addTaskButton.type = 'button';
    addTaskButton.textContent = 'Add Task';
    taskForm.appendChild(addTaskButton);

    addTaskButton.addEventListener('click', addTask/*(taskTittle.textContent, taskDescription, document.querySelector('input[name="priority"]:checked').value,
    dueDate.value, projectSelectContainer.value)*/);
    


    //make button for opening/closing the modal for adding tasks
    const openTaskModalButton = document.getElementById('addTaskModalOpen');
    const closeTaskModalButton = document.getElementById('task-modal-close');
    

    openTaskModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-task');
        openModal(modal);
        //currentDate = getDate();
        currentDate = format(new Date(), 'yyyy-MM-dd');
        dueDate.min = currentDate;
        dueDate.value = currentDate;
        checkPastDueDate();
        //dueDate.valueAsDate = new Date(currentDate);

        //let dataNormal = format(new Date(), 'yyy-MM-dd');
        //console.log(dataNormal, currentDate);
        //updateProjectList();
        // dueDate.valueAsDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),
        // currentDate.getDay());
    })


    closeTaskModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-task');
        closeModal(modal);
    })

    const errorModal = document.createElement('div');
    errorModal.id = 'task-name-error-modal';
    errorModal.classList.add('modal');
    document.body.appendChild(errorModal);
    const errorMsg = document.createElement('div');
    errorMsg.textContent = 'A task with the same tittle already exists. Please pick another tittle.';
    errorMsg.id = 'tittle-error-message';
    errorModal.appendChild(errorMsg);
    const errorModalClose = document.createElement('button');
    errorModalClose.id = 'task-name-error-close';
    errorModalClose.textContent = 'OK';
    errorModal.appendChild(errorModalClose);

    errorModalClose.addEventListener('click', () => {
        errorModal.classList.remove('active');
    })

    const tasksContainer = document.createElement('div');
    tasksContainer.id = 'tasks-container';
    content.appendChild(tasksContainer);

    //footer
    const footer = document.createElement('footer');
    const footerAuthor = document.createElement('div');
    footerAuthor.textContent = 'Placeholder footer';
    footer.appendChild(footerAuthor);
    document.body.appendChild(footer);
    
    // retrieve and add tasks to page
    addTasksToPage();
    checkPastDueDate();

}

export { pageLoad };