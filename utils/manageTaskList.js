const ManageTaskList = (() => {
  const addToTaskList = (project, task) => {
    project.taskList.push(task);
  };

  const deleteTask = () => {};
  return { addToTaskList };
})();

export { ManageTaskList };
