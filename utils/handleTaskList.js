const HandleTaskList = (() => {
  const _getProjectList = () =>
    JSON.parse(localStorage.getItem('projectList')) || [];

  const _getFilterList = () =>
    JSON.parse(localStorage.getItem('filterList')) || [];

  const getTaskList = (list, projectName) => {
    if (list === 'projectList') {
      const _projectList = _getProjectList();

      const _project = _projectList.find(
        (project) => project.title === projectName
      );
      return _project.taskList;
    } else if (list === 'filterList') {
      const _filterList = _getFilterList();

      const _project = _filterList.find(
        (project) => project.title === projectName
      );
      return _project.taskList;
    } else {
      const _project = list.find((project) => project.title === projectName);
      return _project.taskList;
    }
  };

  const _checkForDuplicates = (project, taskItem) => {
    return project.taskList.find((task) => task.taskName === taskItem.taskName);
  };

  const addToTaskList = (list, projectName, task) => {
    if (list === 'projectList') {
      const _projectList = _getProjectList();

      const _project = _projectList.find(
        (project) => project.title === projectName
      );

      if (_checkForDuplicates(_project, task)) {
        return;
      }

      _project.taskList.push(task);

      localStorage.setItem('projectList', JSON.stringify(_projectList));
    } else if (list === 'filterList') {
      const _filterList = _getFilterList();

      const _project = _filterList.find(
        (project) => project.title === projectName
      );

      if (_checkForDuplicates(_project, task)) {
        return;
      }

      _project.taskList.push(task);

      localStorage.setItem('filterList', JSON.stringify(_filterList));
    }
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

  return { addToTaskList, getTask, getTaskList };
})();

export { HandleTaskList };
