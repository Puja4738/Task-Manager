import React from 'react';
import { Task } from '../../types';
import { TaskCard } from '../tasks/TaskCard';
import { AlertCircle } from 'lucide-react';

interface OverdueTasksProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const OverdueTasks: React.FC<OverdueTasksProps> = ({
  tasks,
  onEdit,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="card bg-green-50 border border-green-200">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 p-2 rounded-full">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-900">
              No Overdue Tasks
            </h3>
            <p className="text-sm text-green-700">
              Great job! You're on top of your tasks.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-red-500 p-2 rounded-full">
          <AlertCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Overdue Tasks ({tasks.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};