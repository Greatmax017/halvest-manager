import React from 'react';

const TaskFilter = ({ onFilterChange }) => {
  return (
    <div className="mb-6">
      <select
        onChange={(e) => onFilterChange(e.target.value || undefined)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;