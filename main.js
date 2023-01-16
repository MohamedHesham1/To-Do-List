import './style.scss';
import { ManageTaskList } from './utils/manageTaskList.js';
import { ManageProjects } from './utils/manageProjects.js';
import { CreateProject } from './utils/createProject.js';

// selectors
const modals = document.querySelectorAll('.modal');
const projectForm = document.querySelector('#project-form');
const projectsNav = document.querySelector('.projects-nav');
const taskForm = document.querySelector('#task-form');
function handleModal() {
  const addProjectBtn = document.querySelector('.add-project');
  const closeBtns = document.querySelectorAll('.close-btn');
  const addTaskBtn = document.querySelector('.add-task');

  addProjectBtn.addEventListener('click', () => {
    modals[0].showModal();
  });
  addTaskBtn.addEventListener('click', () => {
    modals[1].showModal();
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modals.forEach((modal) => {
        modal.close();
      });
    });
  });
}

