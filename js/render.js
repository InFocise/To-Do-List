// render.js
// Pure DOM-rendering functions. Takes task data in, updates the UI.

const taskListEl = document.getElementById('taskList');
const emptyStateEl = document.getElementById('emptyState');
const itemsLeftEl = document.getElementById('itemsLeft');

const CHECK_ICON = `
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
`;

const TRASH_ICON = `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
  </svg>
`;

/**
 * Build a single <li> task row.
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.dataset.id = task.id;

  li.innerHTML = `
    <button class="task-checkbox" aria-label="Toggle task completed">${CHECK_ICON}</button>
    <span class="task-text">${escapeHtml(task.text)}</span>
    <button class="task-delete" aria-label="Delete task">${TRASH_ICON}</button>
  `;

  return li;
}

/**
 * Escape user input before inserting into innerHTML.
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Render the task list based on tasks + current filter.
 * @param {Array} tasks
 * @param {'all'|'active'|'completed'} filter
 */
function renderTasks(tasks, filter) {
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  taskListEl.innerHTML = '';

  if (filtered.length === 0) {
    taskListEl.classList.add('hide');
    emptyStateEl.classList.add('show');
  } else {
    taskListEl.classList.remove('hide');
    emptyStateEl.classList.remove('show');
    filtered.forEach((task) => {
      taskListEl.appendChild(createTaskElement(task));
    });
  }

  renderFooter(tasks);
}

/**
 * Update the "X items left" counter.
 */
function renderFooter(tasks) {
  const remaining = tasks.filter((t) => !t.completed).length;
  itemsLeftEl.textContent = `${remaining} item${remaining === 1 ? '' : 's'} left`;
}

/**
 * Reflect the active filter tab in the UI.
 */
function renderActiveFilter(filter) {
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });
}
