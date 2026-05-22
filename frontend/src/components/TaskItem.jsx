import React from 'react';
import {  Trash2, Check, X, Archive, Star } from 'lucide-react';

const TaskItem = ({
  task,
  isEditing,
  editForm,
  setEditForm,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onArchive,
  onUnarchive,
  onToggleStar,
  showArchived
}) => {

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-900/30 text-red-300 border-red-700';
      case 'medium': return 'bg-yellow-900/30 text-yellow-300 border-yellow-700';
      case 'low': return 'bg-green-900/30 text-green-300 border-green-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-blue-900/30 text-blue-300';
      case 'in-progress': return 'bg-purple-900/30 text-purple-300';
      case 'completed': return 'bg-green-900/30 text-green-300';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  // EDIT MODE
  if (isEditing) {
    return (
      <div className="border border-slate-600 rounded-xl p-5 bg-slate-900/30">
        <div className="space-y-3">

          <input
            type="text"
            value={editForm.title}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
          />

          <input
            type="text"
            value={editForm.description}
            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={editForm.priority}
              onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
              className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <input
            type="date"
            value={editForm.dueDate}
            onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={editForm.tags}
            onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-gray-200"
          />

          <div className="flex gap-2">
            <button onClick={onSave} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg">
              <Check size={18} /> Save
            </button>
            <button onClick={onCancel} className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg">
              <X size={18} /> Cancel
            </button>
          </div>

        </div>
      </div>
    );
  }

  // NORMAL MODE
  return (
    <div className={`border rounded-xl p-5 ${task.starred ? 'border-yellow-500 bg-slate-900/50' : 'border-slate-600 bg-slate-900/30'
      }`}>

      <div className="flex justify-between items-start mb-3">

        <div className="flex gap-3 flex-1">

          {/*  FIXED */}
          <button onClick={() => onToggleStar(task._id)}>
            <Star size={20}
              className={task.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}
            />
          </button>

          <div>
            <h3 className="text-xl text-gray-100">{task.title}</h3>
            <p className="text-gray-400 text-sm">{task.description}</p>
          </div>

        </div>

        <div className="flex gap-2">

          {!showArchived && (
            <button onClick={() => onArchive(task._id)}>
              <Archive size={18} />
            </button>
          )}

          {showArchived && (
            <button onClick={() => onUnarchive(task._id)}>
              <Archive size={18} />
            </button>
          )}

          <button onClick={() => onDelete(task._id)}>
            <Trash2 size={18} />
          </button>

          <button onClick={() => onDelete(task._id)}>
            <Trash2 size={18} />
          </button>

        </div>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-2">

        <span className={`px-3 py-1 text-xs border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>

        <span className={`px-3 py-1 text-xs ${getStatusColor(task.status)}`}>
          {task.status}
        </span>

        {/* FIXED TAGS */}
        {(
          Array.isArray(task.tags)
            ? task.tags
            : typeof task.tags === "string"
              ? task.tags.split(",")
              : []
        ).map((tag, i) => (
          <span key={tag + i} className="px-2 py-1 text-xs bg-indigo-900 text-indigo-300">
            #{tag.trim()}
          </span>
        ))}

      </div>

    </div>
  );
};

export default TaskItem;