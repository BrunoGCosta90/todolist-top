const pageLoad = () => {
    const header = document.createElement('header');
    // header.classList.add('header');
    header.textContent = 'ToDo';
    document.body.appendChild(header);

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    document.body.appendChild(sidebar);

    const content = document.createElement('div');
    content.classList.add('content');
    document.body.appendChild(content);

    const footer = document.createElement('footer');
    footer.textContent = 'Placeholder footer';
    document.body.appendChild(footer);


}

export { pageLoad };