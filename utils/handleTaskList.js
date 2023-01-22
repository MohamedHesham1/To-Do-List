const HandleTaskList = (() => {
  const _getProjectList = () =>
    JSON.parse(localStorage.getItem('projectList')) || [];

  const _getFilterList = () =>
    JSON.parse(localStorage.getItem('filterList')) || [];

  const _projectList = _getProjectList();
  const _filterList = _getFilterList();

  const addToTaskList = (list, projectName, task) => {
    if (list === 'projectList') {
      const _project = _projectList.find(
        (project) => project.title === projectName
      );
      _project.taskList.push(task);
    } else if (list === 'filterList') {
      const _project = _filterList.find(
        (project) => project.title === projectName
      );
      _project.taskList.push(task);
    }
  };

  const getTaskList = (list, projectName) => {
    if (list === 'projectList') {
      const _project = _projectList.find(
        (project) => project.title === projectName
      );
      return _project.taskList;
    } else if (list === 'filterList') {
      const _project = _filterList.find(
        (project) => project.title === projectName
      );
      return _project.taskList;
    }
  };

  // needs adjusting
  const getTask = (project, taskName) => {
    project.taskList.find((task) => task.taskName === taskName);
  };

  const removeTask = (project, task) => {
    let index = project.taskList.indexOf(task);
    if (index !== -1) {
      project.taskList.splice(index, 1);
    }
  };

  return { addToTaskList, getTask, getTaskList, removeTask };
})();

export { HandleTaskList };
