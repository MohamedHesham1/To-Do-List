const HandleTaskList = (() => {
  const _getProjectList = () =>
    JSON.parse(localStorage.getItem('projectList')) || [];

  const getTaskList = (projectName) => {
      const _projectList = _getProjectList();

    console.log(_projectList);
      const _project = _projectList.find(
        (project) => project.title === projectName
      );

    if (!_project) return;

      return _project.taskList;
  };

  const _checkForDuplicates = (project, taskItem) => {
    return project.taskList.find((task) => task.taskName === taskItem.taskName);
  };

  const addToTaskList = (projectName, task) => {
      const _projectList = _getProjectList();

      const _project = _projectList.find(
        (project) => project.title === projectName
      );

    if (!_project) return;

    if (_checkForDuplicates(_project, task)) return;

      _project.taskList.push(task);

      localStorage.setItem('projectList', JSON.stringify(_projectList));
  };

  // needs adjusting
  const getTask = (project, taskName) => {
    project.taskList.find((task) => task.taskName === taskName);
  };

  const removeTask = (list, projectName, task) => {
    if (list === 'projectList') {
      const _project = _projectList.find(
        (project) => project.title === projectName
      );

      const filteredList = _project.taskList.filter((taskItem) => {
        return !(task.taskName === taskItem.taskName);
      });

      localStorage.setItem('projectList', JSON.stringify(filteredList));
    } else if (list === 'filterList') {
      const _project = _filterList.find(
        (project) => project.title === projectName
      );

      const filteredList = _project.taskList.filter((taskItem) => {
        return !(task.taskName === taskItem.taskName);
      });

      localStorage.setItem('filterList', JSON.stringify(filteredList));
    }
  };

  return { addToTaskList, getTaskList };
})();

export { HandleTaskList };
