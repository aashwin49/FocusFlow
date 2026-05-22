const TASKS_KEY = 'task_manager_tasks';
const ARCHIVED_KEY = 'task_manager_archived';

export const storage = {
  // Get all active tasks from localStorage
  getTasks: () => {
    try {
      const tasks = localStorage.getItem(TASKS_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error);
      return [];
    }
  },

  // Save active tasks to localStorage
  saveTasks: (tasks) => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      return false;
    }
  },

  // Get archived tasks from localStorage
  getArchivedTasks: () => {
    try {
      const archived = localStorage.getItem(ARCHIVED_KEY);
      return archived ? JSON.parse(archived) : [];
    } catch (error) {
      console.error('Error reading archived tasks:', error);
      return [];
    }
  },

  // Save archived tasks to localStorage
  saveArchivedTasks: (tasks) => {
    try {
      localStorage.setItem(ARCHIVED_KEY, JSON.stringify(tasks));
      return true;
    } catch (error) {
      console.error('Error saving archived tasks:', error);
      return false;
    }
  },

  // Clear all data from localStorage
  clearAll: () => {
    try {
      localStorage.removeItem(TASKS_KEY);
      localStorage.removeItem(ARCHIVED_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};