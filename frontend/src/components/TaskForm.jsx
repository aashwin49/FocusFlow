import React from 'react';
import { Plus } from 'lucide-react';

const TaskForm = ({ newTask, setNewTask, onAddTask }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.title.trim()) {
      onAddTask();
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 mb-6 border border-slate-700">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">Create New Task</h2>
      <div className="space-y-4">
        {/* Title and Description Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Task title * (required)"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            onKeyPress={handleKeyPress}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          />
        </div>

        {/* Priority, Status, Due Date, Tags, Add Button Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newTask.tags}
            onChange={(e) => setNewTask({...newTask, tags: e.target.value})}
            className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          />

          <button
            onClick={onAddTask}
            disabled={!newTask.title.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;