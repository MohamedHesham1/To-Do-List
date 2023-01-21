import './style.scss';
import { HandleLocalStorageProjects } from './utils/handleLocalStorageProjects.js';
import { HandleTaskList } from './utils/handleTaskList.js';

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

const getProjectList = () => HandleLocalStorageProjects.getProjectList();

const addToLocalStorage = () => {
  const isDuplicate = HandleLocalStorageProjects.getProject(projectInput.value);

  if (isDuplicate) {
    alert(`${projectInput.value} already exists!`);
    return;
  }
  HandleLocalStorageProjects.addToProjectList(projectInput.value);
};

const removeFromLocalStorage = (e) => {
  //! delete from local storage ,eventlistener for delete-project

  if (e.target.classList.contains('delete-project')) {
    const _projectName = e.target.previousElementSibling.innerText;
    HandleLocalStorageProjects.removeProject(_projectName);
  }
};

const displayProjects = () => {
  const projectList = getProjectList();

  projectList.forEach((project) => {
    newProjects.innerHTML += `
    <li ><a href="#" class ="project">${project.title} </a> <button class="delete-project">X</button> </li>`;
  });
};

const handleProjectInteractions = (() => {
  const addProjectPage = () => {
    const project = HandleLocalStorageProjects.getProject(projectInput.value);
    const projectNames = Array.from(
      document.querySelectorAll('.new-projects li')
    );
    // check for duplicates
    const isDuplicate = projectNames.find(
      (item) => item.innerText === project.title
    );

    if (isDuplicate) return;

    newProjects.innerHTML += `
    <li ><a href="#" class ="project">${project.title}</a> <button class="delete-project">X</button></li>`;
  };

  const removeProjectPage = (e) => {
    if (e.target.classList.contains('delete-project')) {
      const _project = e.target.parentElement;
      _project.remove();
    }
  };

  const highlightProject = (e) => {
    const projects = document.querySelectorAll('.project');
    if (e.target.classList.contains('project')) {
      projects.forEach((project) => {
        project.classList.remove('selected');
      });
      e.target.classList.add('selected');
    }
  };
  return { highlightProject, addProjectPage, removeProjectPage };
})();
const handleForm = (() => {
  const getFormData = () => {
    const formData = new FormData(taskForm);
    const taskData = Object.fromEntries(formData);

    return taskData;
  };
  const resetForm = (e) => {
    e.target.reset();
    modals.forEach((modal) => {
      modal.close();
    });
  };
  return { getFormData, resetForm };
})();
