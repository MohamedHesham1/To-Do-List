import './style.scss';
import { HandleLocalStorageProjects } from './utils/handleLocalStorageProjects.js';
import { HandleTaskList } from './utils/handleTaskList.js';
import { isToday, parseISO, isThisWeek } from 'date-fns';

const modals = document.querySelectorAll('.modal');
const projectForm = document.querySelector('#project-form');
const projectsNav = document.querySelector('.projects-nav');
const taskForm = document.querySelector('#task-form');
const newProjects = document.querySelector('.new-projects');
const projectInput = document.querySelector('#project-input');
const taskList = document.querySelector('.task-list');
let currentProject = 'All';

document.addEventListener('DOMContentLoaded', () => {
  HandleLocalStorageProjects.setProjectList();
  HandleLocalStorageProjects.setFilterList();
  addFilterProjects();
  toggleModal();
  displayProjects();
  HandleProjectInteractions.highlightAllFilter();
  displayTasks();
});

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addToLocalStorage();
  HandleProjectInteractions.addProjectPage();
  HandleForm.resetForm(e);
});

projectsNav.addEventListener('click', (e) => {
  HandleProjectInteractions.highlightProject(e);
  removeProjectPage(e);
  displayTasks();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  HandleTaskList.addToTaskList('filterList', 'All', HandleForm.getFormData());
  addTaskToProject();

  addToDateFilters();
  HandleTaskInteractions.addTaskItem();
  HandleForm.resetForm(e);
});

taskList.addEventListener('click', (e) => {
  HandleTaskInteractions.checkTask(e);
  removeTask(e);
});

// functions
function toggleModal() {
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

const addToLocalStorage = () => {
  const isDuplicate = HandleLocalStorageProjects.getProject(projectInput.value);

  if (isDuplicate) {
    return;
  }

  HandleLocalStorageProjects.addToProjectList(projectInput.value);
};

const addFilterProjects = () => {
  const filterProjects = ['All', 'Today', 'Week'];
  const filterList = HandleLocalStorageProjects.getFilterList();
  let duplicate = false;

  for (let i = 0; i < filterList.length; i++) {
    if (filterProjects[i] === filterList[i].title) {
      duplicate = true;
    }
  }

  if (duplicate) return;

  filterProjects.forEach((project) => {
    HandleLocalStorageProjects.addToFilterList(project);
  });
};

const displayProjects = () => {
  const projectList = HandleLocalStorageProjects.getProjectList();
  projectList.forEach((project) => {
    newProjects.innerHTML += `
    <li ><a href="#" class ="project">${project.title} </a> <button class="delete-project delete-btn ">X</button> </li>`;
  });
};

const removeProjectPage = (e) => {
  if (e.target.classList.contains('delete-project')) {
    const _projectName = e.target.previousElementSibling.innerText;
    const _project = e.target.parentElement;

    HandleLocalStorageProjects.removeProject(_projectName);
    _project.remove();
  }
};

const HandleProjectInteractions = (() => {
  const addProjectPage = () => {
    const project = HandleLocalStorageProjects.getProject(projectInput.value);

    const projectNames = Array.from(
      document.querySelectorAll('.new-projects a')
    );

    const isDuplicate = projectNames.find(
      (item) => item.innerText === project.title
    );

    if (isDuplicate) {
      alert(`${projectInput.value} already exists!`);
      return;
    }

    newProjects.innerHTML += `
    <li ><a href="#" class ="project">${project.title}</a> <button class="delete-project delete-btn ">X</button></li>`;
  };

  const highlightProject = (e) => {
    const projects = document.querySelectorAll('.project');

    if (e.target.classList.contains('project')) {
      projects.forEach((project) => {
        project.classList.remove('selected');
      });
      e.target.classList.add('selected');
      currentProject = e.target.innerText;
    }
  };

  const highlightAllFilter = () => {
    const allFilter = document.querySelector('.all-filter');
    allFilter.classList.add('selected');
  };

  return {
    highlightProject,
    addProjectPage,
    highlightAllFilter,
  };
})();

//! tasks
const HandleForm = (() => {
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

const getTaskObject = () => HandleForm.getFormData();

const HandleTaskInteractions = (() => {
  //! DOM only

  const addTaskItem = () => {
    const taskName = Array.from(document.querySelectorAll('summary h3'));
    const isDuplicate = taskName.find((name) => {
      return name.innerText === getTaskObject()['taskName'];
    });

    if (isDuplicate) {
      alert(`${getTaskObject()['taskName']} already exists!`);
      return;
    }

    taskList.innerHTML += `
  <li class="task-item">
    <input
      type="checkbox"
      class="task-checkbox"
      aria-label="check task"
    />
    <details>
      <summary><h3>${getTaskObject()['taskName']}</h3>
      </summary>
      <p> ${getTaskObject()['description']}</p>
      <p> Due Date:  ${getTaskObject()['dueDate']}</p>
    </details>
    <div class="btn-wrapper">
      <button type="button" class="edit-btn ">
        <svg  width="16px" height="16px">
          <use
            xlink:href="public/Edit.svg#edit-icon"
          ></use>
        </svg>
      </button>
      <button type="button" class="delete-btn  delete-task">
        X
      </button>
    </div>
  </li>
  `;
  };

  // <div class= 'priority'>${getFormData()['priority']}</div>

  const checkTask = (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      e.target.parentElement.classList.toggle('strikethrough');
    }
  };

  return { addTaskItem, checkTask };
})();

const addToDateFilters = () => {
  const task = HandleForm.getFormData();
  const taskDueDate = parseISO(task.dueDate);

  if (isToday(taskDueDate)) {
    HandleTaskList.addToTaskList('filterList', 'Today', task);
  } else if (isThisWeek(taskDueDate)) {
    HandleTaskList.addToTaskList('filterList', 'Week', task);
  } else {
    return;
  }
};

const addTaskToProject = () => {
  const task = HandleForm.getFormData();
  let isFilter = false;

  const filterProjects = Array.from(
    document.querySelectorAll('.filter-projects a')
  );

  filterProjects.forEach((project) => {
    if (project.innerText === currentProject) isFilter = true;
  });

  if (currentProject === 'All') {
    return;
  }
  if (isFilter) {
    return;
  }
  console.log(currentProject);

  HandleTaskList.addToTaskList('projectList', currentProject, task);
};

const displayTasks = () => {
  const projectList = HandleLocalStorageProjects.getProjectList();
  const filterList = HandleLocalStorageProjects.getFilterList();
  const AllProjects = projectList.concat(filterList);
  const tasks = HandleTaskList.getTaskList(AllProjects, currentProject);

  taskList.innerHTML = '';

  tasks.forEach((task) => {
    taskList.innerHTML += `
    <li class="task-item">
    <input
      type="checkbox"
      class="task-checkbox"
      aria-label="check task"
    />
    <details>
      <summary><h3>${task['taskName']}</h3>
      </summary>
      <p> ${task['description']}</p>
      <p> Due Date:  ${task['dueDate']}</p>
    </details>
    <div class="btn-wrapper">
      <button type="button" class="edit-btn ">
        <svg  width="16px" height="16px">
          <use
            xlink:href="public/Edit.svg#edit-icon"
          ></use>
        </svg>
      </button>
      <button type="button" class="delete-btn  delete-task">
        X
      </button>
    </div>
  </li>
  `;
  });
};

// const editTask = () => {
//   HandleTaskList.getTaskList()

// };

const removeTask = (e) => {
  if (!e.target.classList.contains('delete-task')) return;
  e.target.parentElement.parentElement.remove();
};

// !!!
// const removeTask = (e) => {
//   let isFilter = false;

//   const filterProjects = Array.from(
//     document.querySelectorAll('.filter-projects a')
//   );

//   filterProjects.forEach((project) => {
//     if (project.innerText === currentProject) isFilter = true;
//   });

//   if (e.target.classList.contains('delete-task')) {
//     if (isFilter) {
//       HandleTaskList.removeTask(
//         'filterList',
//         currentProject,
//         HandleForm.getFormData()
//       );
//     } else {
//       HandleTaskList.removeTask(
//         'projectList',
//         currentProject,
//         HandleForm.getFormData()
//       );
//     }
//   }
// };

{
  /* <div class= 'priority'>${task['priority']}</div> */
}
