import editImg from '../assets/Edit.svg';

const HandleTasks = (() => {
  const displayTasks = (parentElement, task) => {
    parentElement.innerHTML += `
    <li class="task-item" data-id ="${task.id}">

      <details>

        <summary><input
        type="checkbox"
        class="task-checkbox"
        aria-label="check task"
      />
      <h3>${task.taskName}</h3>
        </summary>
        <p> ${task.description}</p>
        <p> Due Date:  ${task.dueDate}</p>
      </details>
      <div class="btn-wrapper">
        <button type="button" class="edit-btn ">
          <svg  width="16px" height="16px">
            <use
              xlink:href="${editImg}#edit-icon"
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

  const _getTaskList = () => JSON.parse(localStorage.getItem('taskList')) || [];

  const getTask = (taskId) => {
    const _taskList = _getTaskList();
    return _taskList.find((task) => task.id === taskId);
  };

  const updateTask = (taskId, newTask) => {
    const _taskList = _getTaskList();
    const oldTask = _taskList.find((task) => task.id === taskId);
    console.log(oldTask, newTask);
    oldTask.taskName = newTask.taskName;
    oldTask.description = newTask.description;
    oldTask.priority = newTask.priority;
    oldTask.dueDate = newTask.dueDate;
    localStorage.setItem('taskList', JSON.stringify(_taskList));
  };

  const checkTask = (taskId) => {
    const _taskList = getTaskList();
    const _task = _taskList.find((task) => task.id === taskId);
  };

  return { displayTasks, getTask, updateTask };
})();

export { HandleTasks };
