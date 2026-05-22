import React from 'react';
import { BarChart3, Clock, Calendar, Check, Star } from 'lucide-react';

const Statistics = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      {/* Total Tasks Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-5 border border-slate-700 hover:border-blue-500 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
          <BarChart3 className="text-blue-400" size={24} />
        </div>
        <div className="text-gray-400 text-sm font-medium">Total Tasks</div>
      </div>

      {/* To Do Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-5 border border-slate-700 hover:border-yellow-500 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-yellow-400">{stats.todo}</div>
          <Clock className="text-yellow-400" size={24} />
        </div>
        <div className="text-gray-400 text-sm font-medium">To Do</div>
      </div>

      {/* In Progress Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-5 border border-slate-700 hover:border-purple-500 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-purple-400">{stats.inProgress}</div>
          <Calendar className="text-purple-400" size={24} />
        </div>
        <div className="text-gray-400 text-sm font-medium">In Progress</div>
      </div>

      {/* Completed Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-5 border border-slate-700 hover:border-green-500 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
          <Check className="text-green-400" size={24} />
        </div>
        <div className="text-gray-400 text-sm font-medium">Completed</div>
      </div>

      {/* Completion Rate Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl p-5 border border-slate-700 hover:border-pink-500 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-pink-400">{completionRate}%</div>
          <Star className="text-pink-400" size={24} />
        </div>
        <div className="text-gray-400 text-sm font-medium">Completion Rate</div>
      </div>
    </div>
  );
};

export default Statistics;