import React from 'react';
import { Download, Upload } from 'lucide-react';

const ControlBar = ({ onExport, onImport }) => {
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 mb-6 border border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Task Manager Pro
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Advanced task organization and productivity tracking
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50 font-medium"
          >
            <Download size={18} />
            Export
          </button>
          <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-lg hover:shadow-green-500/50 font-medium">
            <Upload size={18} />
            Import
            <input 
              type="file" 
              accept=".json" 
              onChange={onImport} 
              className="hidden" 
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;