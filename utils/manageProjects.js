import { CreateProject } from './createProject.js';

const ManageProjects = (() => {
  const _projectList = [];

  const addProject = (projectName) => {
    const _project = CreateProject(`${projectName}`);
    _projectList.push(_project);
  };
  const getProject = (projectName) =>
    _projectList.find((project) => project.title === projectName);
  const getProjectList = () => _projectList;

  // const removeProject = ()=>{
  // }
  return { addProject, getProject, getProjectList };
})();

export { ManageProjects };
