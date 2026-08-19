// app.js
// Main application logic: state, event listeners, ties storage.js + render.js together.

let tasks = getTasks();
let currentFilter = 'all';

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const filterTabs = document.getElementById('filterTabs');
const clearCompletedBtn = document.getElementById('clearCompleted');

/**
 * Re-render list + footer + active filter tab from current state.
 */
function update() {
  renderTasks(tasks, currentFilter);
  renderActiveFilter(currentFilter);
  saveTasks(tasks);
}

/**
 * Add a new task from the input field.
 */
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  tasks.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text: trimmed,
    completed: false,
  });

  update();
}

/**
 * Toggle a task's completed state by id.
 */
function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  update();
}

/**
 * Delete a task by id.
 */
function deleteTask(id) {
  const el = document.querySelector(`.task-item[data-id="${id}"]`);
  if (el) {
    el.style.transition = 'opacity 0.15s ease';
    el.style.opacity = '0';
  }
  setTimeout(() => {
    tasks = tasks.filter((t) => t.id !== id);
    update();
  }, 120);
}

/**
 * Remove all completed tasks.
 */
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  update();
}

// ---------- Event listeners ----------

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

// Event delegation for checkbox toggle + delete (list is re-rendered often)
taskListEl.addEventListener('click', (e) => {
  const item = e.target.closest('.task-item');
  if (!item) return;
  const id = item.dataset.id;

  if (e.target.closest('.task-checkbox') || e.target.closest('.task-text')) {
    toggleTask(id);
  } else if (e.target.closest('.task-delete')) {
    deleteTask(id);
  }
});

filterTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  currentFilter = tab.dataset.filter;
  update();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// ---------- Init ----------
update();
