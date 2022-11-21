import MenuIcon from '../icons/menu.svg';
import InboxIcon from '../icons/inbox.svg';
import TodayIcon from '../icons/calendar-today.svg';
import UpcomingIcon from '../icons/calendar-month.svg';

const pageLoad = () => {

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
    sidebar.appendChild(projectsLabel);

    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = '+ Add project';
    sidebar.appendChild(addProjectButton);

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