import './style.scss';
import { HandleLocalStorage } from './utils/handleLocalStorage.js';
import { HandleTasks } from './utils/handleTasks.js';
import { isToday, parseISO, isThisWeek } from 'date-fns';
import { HandleForm } from './utils/handleForm.js';

const projectModal = document.querySelector('#project-modal');
const taskModal = document.querySelector('#task-modal');
const projectForm = document.querySelector('#project-form');
const taskForm = document.querySelector('#task-form');
const projectsNav = document.querySelector('.projects-nav');
const newProjects = document.querySelector('.new-projects');
const taskSection = document.querySelector('.task-section');
const taskList = document.querySelector('.task-list');
const submitBtn = document.querySelector('.submit-task');

let currentProject;
let currentTaskId;

document.addEventListener('DOMContentLoaded', () => {
  HandleModal.closeBtns();
  HandleLocalStorage.setTaskList();
  displayProjects();
  displayTasks(currentProject);
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  HandleLocalStorage.setProjectList();
  HandleLocalStorage.addToProjectList(HandleForm.getFormData(projectForm));
  displayProjects();
  HandleForm.resetForm(projectForm);
  HandleModal.closeModal(projectModal);
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentProject === 'Today' || currentProject === 'Week') {
    currentProject = 'All';
  }

  if (submitBtn.classList.contains('edit-task')) {
    HandleTasks.updateTask(currentTaskId, HandleForm.getFormData(taskForm));
    HandleForm.resetForm(taskForm);
    HandleModal.closeModal(taskModal);
    displayTasks(currentProject);
    return;
  }
  HandleLocalStorage.addToTaskList(
    HandleForm.getFormData(taskForm),
    currentProject
  );
  HandleForm.resetForm(taskForm);
  HandleModal.closeModal(taskModal);
  displayTasks(currentProject);
});

projectsNav.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-project')) {
    HandleModal.showModal(projectModal);
  }
  highlightProject(e);
  setCurrentProject(e);
  removeProject(e);
  if (
    e.target.classList.contains('project') &&
    !e.target.classList.contains('date-filter')
  ) {
    displayTasks(currentProject);
  }
  if (e.target.classList.contains('date-filter')) displayTasksByDate(e);
});

taskSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-task')) {
    HandleModal.showModal(taskModal);
    HandleForm.resetForm(taskForm);
    submitBtn.classList.remove('edit-task');
  } else if (e.target.classList.contains('edit-btn')) {
    currentTaskId = e.target.parentElement.parentElement.dataset.id;
    submitBtn.classList.add('edit-task');
    handleEdit(e);
  }
  if (e.target.closest('.task-checkbox')) {
    e.target.closest('.task-item').classList.toggle('strikethrough');
    HandleTasks.checkTask(
      e.target.parentElement.parentElement.parentElement.dataset.id
    );
  }
  removeTask(e);
});

const HandleModal = (() => {
  const closeModal = (modal) => modal.close();
  const showModal = (modal) => modal.showModal();
  const closeBtns = () => {
    const _modals = document.querySelectorAll('.modal');
    const _closeBtns = document.querySelectorAll('.close-btn');

    _closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        _modals.forEach((modal) => {
          modal.close();
        });
      });
    });
  };

  return { showModal, closeModal, closeBtns };
})();

const displayProjects = () => {
  const projectList = HandleLocalStorage.getProjectList();
  newProjects.innerHTML = '';

  for (let i = 0; i < projectList.length; i++) {
    newProjects.innerHTML += `
    <li ><a href="#" class ="project">${projectList[i].title} </a>
    <button class="delete-project delete-btn ">X</button> </li>`;
  }
};

const removeProject = (e) => {
  if (e.target.classList.contains('delete-project')) {
    const _projectName = e.target.previousElementSibling.innerText;
    const _project = e.target.parentElement;

    HandleLocalStorage.removeProject(_projectName);
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
const setCurrentProject = (e) => {
  if (e.target.classList.contains('project'))
    currentProject = e.target.innerText;
};

const displayTasks = (projectName) => {
  const tasks = HandleLocalStorage.getTaskList();

  if (!tasks) return;

  if (!projectName || projectName === 'All') {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      HandleTasks.displayTasks(taskList, task);
    });

    return;
  }
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    if (projectName === task.projectName) {
      HandleTasks.displayTasks(taskList, task);
    }
  });
};

const displayTasksByDate = (e) => {
  const tasks = HandleLocalStorage.getTaskList();

  if (e.target.classList.contains('today-filter')) {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      if (isToday(parseISO(task.dueDate))) {
        HandleTasks.displayTasks(taskList, task);
      }
    });
  } else if (e.target.classList.contains('week-filter')) {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      if (isThisWeek(parseISO(task.dueDate))) {
        HandleTasks.displayTasks(taskList, task);
      }
    });
  }
};

const handleEdit = (e) => {
  const task = HandleTasks.getTask(
    e.target.parentElement.parentElement.dataset.id
  );

  HandleModal.showModal(taskModal);

  document.querySelector('#task-name').value = task.taskName;
  document.querySelector('#description').value = task.description;
  document.querySelector('#due-date').value = task.dueDate;
  document.querySelector('#priority').value = task.priority;
};

const removeTask = (e) => {
  if (!e.target.classList.contains('delete-task')) return;
  const taskId = e.target.parentElement.parentElement.dataset.id;
  HandleLocalStorage.removeTask(taskId);
  e.target.parentElement.parentElement.remove();
};
