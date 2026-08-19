// storage.js
// Handles reading and writing tasks to localStorage.

const STORAGE_KEY = 'infocise_todo_tasks';

/**
 * Retrieve all tasks from localStorage.
 * @returns {Array<{id: string, text: string, completed: boolean}>}
 */
function getTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read tasks from storage:', err);
    return [];
  }
}

/**
 * Persist the full tasks array to localStorage.
 * @param {Array} tasks
 */
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to storage:', err);
  }
}
