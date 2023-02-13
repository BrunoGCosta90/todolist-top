import { closeModal } from "./pageload";
import { addTasksToPage, checkPastDueDate, cleanTasksContainer } from "./taskManagement";

const addProject = () => {
   // const openModalButton = document.getElementById('addProject');
   // const closeModalButton = document.getElementById('modal-close');
   // const overlay = document.getElementById('overlay');

   // openModalButton.addEventListener('click', () => {
   //       const modal = document.getElementById('modal-project');
   //       openModal(modal);
   // })
   
   // overlay.addEventListener('click', () => {
   //    const openModals = document.querySelectorAll('.modal.active');
   //    openModals.forEach(modal => {
   //       closeModal(modal);
   //    })
   // })

   // closeModalButton.addEventListener('click', () => {
   //       const modal = document.getElementById('modal-project');
   //       closeModal(modal);
   // })

   // function openModal(modal){
   //    if (modal == null) return;
   //    modal.classList.add('active')
   //    overlay.classList.add('active')
   // }

   // function closeModal(modal){
   //    if (modal == null) return;
   //    modal.classList.remove('active')
   //    overlay.classList.remove('active')
   // }

   const projectTittle = document.getElementById('add-project-tittle');
   const projects = JSON.parse(localStorage.getItem('projects'));
   for (let i = 0; i < projects.length; i++){
      if (projects[i] == projectTittle.value){
         const errorModal = document.getElementById('project-name-error-modal');
         errorModal.classList.add('active');
         return;
      }
   }
   projects.push(projectTittle.value);
   localStorage.setItem('projects', JSON.stringify(projects));
   updateProjectSelector();

   projectTittle.value = "";
   const modal = document.getElementById('modal-project');

   closeModal(modal);
   addProjectsToSidebar();

} 

// const checkInboxProject = () => {
//    if (!(localStorage.getItem('projects'))) {
//       const projects = ['Inbox'];
//       localStorage.setItem('projects', JSON.stringify(projects));
//    }
// }

const updateProjectSelector = () => {
   
   
   
   const projectSelector = document.getElementById('project-select');
   const projects = JSON.parse(localStorage.getItem('projects'));
   let projectCheck = false;

   for (let i = 0; i < projects.length; i++){
      for (let y = 0; y < projectSelector.children.length; y++) {
         if (projectSelector.children.item(y).value == projects[i]){
            projectCheck = true;
         }
      }
      if (projectCheck == false){
         const newProject = document.createElement('option');
         newProject.value = 
         newProject.text = `${projects[i]}`;
         projectSelector.appendChild(newProject);
      }
      projectCheck = false;
   }

   

   

}

const addProjectsToSidebar = () => {
   const sidebar = document.getElementById('sidebar');
   const projects = JSON.parse(localStorage.getItem('projects'));
   let findButton = false;
   for (let i = 1; i < projects.length; i++){
      for (let y = 5; y < sidebar.childNodes.length; y++){
         if (sidebar.childNodes.item(y).textContent == projects[i]) {
            findButton = true;
            break;
         }
      }
      if (findButton == false) {
         const newButton = document.createElement('button');
         newButton.textContent = `${projects[i]}`;
         newButton.addEventListener('click', (e) => {
            cleanTasksContainer();
            addTasksToPage(e.currentTarget.textContent);
            checkPastDueDate();
         });
         sidebar.appendChild(newButton);
      }
      findButton = false;
   }
}

export { addProject, updateProjectSelector, addProjectsToSidebar }