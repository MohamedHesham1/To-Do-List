import { v4 as uuidv4 } from 'uuid';

const HandleLocalStorage = (() => {
  const setTaskList = () => {
    if (!localStorage.getItem('taskList')) {
      localStorage.setItem('taskList', JSON.stringify([]));
    }
  };

  const setProjectList = () => {
    if (!localStorage.getItem('projectList')) {
      localStorage.setItem('projectList', JSON.stringify([]));
    }
  };

  const getTaskList = () => JSON.parse(localStorage.getItem('taskList')) || [];

  const getProjectList = () =>
    JSON.parse(localStorage.getItem('projectList')) || [];

  const _checkForDuplicates = (list, item) => {
    return list.find((listItem) => listItem.title === item.title);
  };

  const addToTaskList = (task, project = 'All') => {
    const _taskList = getTaskList();
    task.isChecked = false;
    task.id = uuidv4();
    task.projectName = project;
    _taskList.push(task);

    localStorage.setItem('taskList', JSON.stringify(_taskList));
  };

  const addToProjectList = (project) => {
    const _projectList = getProjectList();
    let isDuplicate = false;

    if (_checkForDuplicates(_projectList, project)) {
      isDuplicate = true;
      alert(`${project.title} already exists!`);
      return;
    }

    if (isDuplicate) {
      return;
    }

    _projectList.push(project);

    localStorage.setItem('projectList', JSON.stringify(_projectList));
  };

  const removeTask = (taskId) => {
    const _taskList = getTaskList();

    const filteredList = _taskList.filter((task) => {
      return !(taskId === task.id);
    });

    localStorage.setItem('taskList', JSON.stringify(filteredList));
  };

  const removeProject = (projectName) => {
    const _projectList = getProjectList();

    const filteredList = _projectList.filter((project) => {
      return !(projectName === project.title);
    });

    localStorage.setItem('projectList', JSON.stringify(filteredList));
  };

  return {
    setProjectList,
    setTaskList,
    addToTaskList,
    addToProjectList,
    getTaskList,
    getProjectList,
    removeTask,
    removeProject,
  };
})();

export { HandleLocalStorage };
