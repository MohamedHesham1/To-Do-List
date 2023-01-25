import { CreateProject } from './createProject.js';

const HandleLocalStorageProjects = (() => {
  const setProjectList = () => {
    if (!localStorage.getItem('projectList')) {
      localStorage.setItem('projectList', JSON.stringify([]));
    }
  };

  const setFilterList = () => {
    if (!localStorage.getItem('filterList')) {
      localStorage.setItem('filterList', JSON.stringify([]));
    }
  };

  const getProjectList = () =>
    JSON.parse(localStorage.getItem('projectList')) || [];

  const _checkForDuplicates = (projectList, project) => {
    return projectList.find((item) => item.title === project.title);
  };

  const addToProjectList = (projectName) => {
    const _projectList = getProjectList();
    const _project = CreateProject(projectName);
    let isDuplicate = false;
    if (_checkForDuplicates(_projectList, _project)) {
      isDuplicate = true;
      return;
    }

    _projectList.push(_project);

    localStorage.setItem('projectList', JSON.stringify(_projectList));
  };

  const getProject = (projectName) => {
    const _projectList = getProjectList();

    return _projectList.find((project) => project.title === projectName);
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
    setFilterList,
    getProjectList,
    addToProjectList,
    addToFilterList,
    getFilterList,
    getProject,
    removeProject,
  };
})();

export { HandleLocalStorageProjects };
