import React from 'react';
import { Filter, Search, Archive } from 'lucide-react';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus, 
  filterPriority, 
  setFilterPriority,
  sortBy,
  setSortBy,
  showArchived,
  setShowArchived
}) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 mb-6 border border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-blue-400" />
        <h2 className="text-xl font-semibold text-blue-400">Filters & Controls</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500"
          />
        </div>

        {/* Filter by Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        >
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Filter by Priority */}
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="starred">Starred First</option>
        </select>

        {/* Archive Toggle Button */}
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold ${
            showArchived 
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/50' 
              : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
          }`}
        >
          <Archive size={18} />
          {showArchived ? 'Active' : 'Archive'}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;