import React from 'react';
import { TaskStatus, TaskPriority } from '../../types';

interface TaskFiltersProps {
  filters: {
    status?: string;
    priority?: string;
    sortBy?: string;
  };
  onFilterChange: (filters: any) => void;
}

// Named export
export const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, status: e.target.value || undefined });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, priority: e.target.value || undefined });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value || undefined });
  };

  const handleReset = () => {
    onFilterChange({});
  };

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="input-field"
            value={filters.status || ''}
            onChange={handleStatusChange}
          >
            <option value="">All Status</option>
            {Object.values(TaskStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="input-field"
            value={filters.priority || ''}
            onChange={handlePriorityChange}
          >
            <option value="">All Priorities</option>
            {Object.values(TaskPriority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            className="input-field"
            value={filters.sortBy || '-createdAt'}
            onChange={handleSortChange}
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="dueDate">Due Date (Ascending)</option>
            <option value="-dueDate">Due Date (Descending)</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary w-full"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};