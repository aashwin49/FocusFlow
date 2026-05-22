import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  editingId,
  editForm,
  setEditForm,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onArchive,
  onUnarchive,
  onToggleStar,
  showArchived
}) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700">
      <h2 className="text-2xl font-semibold mb-4 text-blue-400">
        {showArchived ? 'Archived Tasks' : 'Active Tasks'} ({tasks.length})
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl font-medium mb-2">No tasks found</p>
          <p className="text-sm">
            {showArchived
              ? 'You have no archived tasks. Archive completed tasks to keep your workspace clean.'
              : 'Add a new task to get started or adjust your filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                isEditing={editingId === task._id}
                editForm={editForm}
                setEditForm={setEditForm}
                onEdit={onEdit}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                onDelete={onDelete}
                onArchive={onArchive}
                onUnarchive={onUnarchive}
                onToggleStar={onToggleStar}
                showArchived={showArchived}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
