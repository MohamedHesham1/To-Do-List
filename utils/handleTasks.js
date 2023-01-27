const HandleTasks = (() => {
  const displayTasks = (parentElement, task) => {
    parentElement.innerHTML += `
    <li class="task-item" data-id ="${task.id}">
      <input
        type="checkbox"
        class="task-checkbox"
        aria-label="check task"
      />
      <details>
        <summary><h3>${task.taskName}</h3>
        </summary>
        <p> ${task.description}</p>
        <p> Due Date:  ${task.dueDate}</p>
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

  const checkTask = (taskId) => {
    const _taskList = getTaskList();
    const _task = _taskList.find((task) => task.id === taskId);
  };
  return { displayTasks };
})();

export { HandleTasks };
