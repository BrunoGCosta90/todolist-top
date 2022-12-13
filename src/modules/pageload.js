import MenuIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import TodayIcon from '../icons/calendar-today.svg';
import UpcomingIcon from '../icons/calendar-month.svg';
import { addProject } from './functions.js';
import { times } from 'lodash';

const pageLoad = () => {

    //title
    //document.title = "ToDo";

    // header
    const header = document.createElement('header');
    const headerMenuIcon = new Image();
    headerMenuIcon.src = MenuIcon;
    header.appendChild(headerMenuIcon);
    const headerTitle = document.createElement('div');
    headerTitle.textContent = 'ToDo';
    header.appendChild(headerTitle);
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
    todayText.textContent = 'Today'
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
    const addProjectModalTitle = document.createElement('div');
    addProjectModalTitle.classList.add('modal-title');
    addProjectModalTitle.textContent = 'Add Project';
    addProjectModalHeader.appendChild(addProjectModalTitle);
    const addProjectModalClose = document.createElement('button');
    addProjectModalClose.classList.add('close-button');
    addProjectModalClose.id = 'modal-close';
    addProjectModalHeader.appendChild(addProjectModalClose);
    const addProjectModalBody = document.createElement('div');
    addProjectModalBody.classList.add('modal-body');
    addProjectModalBody.textContent = 'asdasd'


    addProjectModal.appendChild(addProjectModalBody);
    document.body.appendChild(addProjectModal);

    //make button for opening/closing the modal for adding project
    const openModalButton = document.getElementById('addProjectModalOpen');
    const closeModalButton = document.getElementById('modal-close');
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    document.body.appendChild(overlay);

    openModalButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-project');
        openModal(modal);
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
    document.body.appendChild(content);

    const footer = document.createElement('footer');
    const footerAuthor = document.createElement('div');
    footerAuthor.textContent = 'Placeholder footer';
    footer.appendChild(footerAuthor);
    document.body.appendChild(footer);


}

export { pageLoad };