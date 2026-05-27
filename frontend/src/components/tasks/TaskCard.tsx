import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority, User } from '../../types';
import { format } from 'date-fns';
import { Calendar, User as UserIcon, Edit, Trash2,  AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  const priorityConfig = {
    [TaskPriority.LOW]: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      icon: '🟢'
    },
    [TaskPriority.MEDIUM]: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      icon: '🟡'
    },
    [TaskPriority.HIGH]: {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-200',
      icon: '🟠'
    },
    [TaskPriority.URGENT]: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: '🔴'
    },
  };

  const statusConfig = {
    [TaskStatus.TODO]: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      icon: '📋'
    },
    [TaskStatus.IN_PROGRESS]: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: '⚡'
    },
    [TaskStatus.REVIEW]: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      icon: '👀'
    },
    [TaskStatus.COMPLETED]: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: '✅'
    },
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== TaskStatus.COMPLETED;

  const getAssigneeName = () => {
    if (typeof task.assignedToId === 'object') {
      return (task.assignedToId as User).name;
    }
    return 'Unknown';
  };

  const getCreatorName = () => {
    if (typeof task.creatorId === 'object') {
      return (task.creatorId as User).name;
    }
    return 'Unknown';
  };

  const isCreator = () => {
    if (!user) return false;
    const creatorId = typeof task.creatorId === 'object' 
      ? (task.creatorId as User)._id 
      : task.creatorId;
    return user._id === creatorId;
  };

  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  return (
    <div 
      className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 p-5 sm:p-6 animate-fade-in ${
        isOverdue 
          ? 'border-l-8 border-l-red-500 border-red-100' 
          : isHovered 
          ? 'border-blue-200 shadow-xl scale-[1.02]' 
          : 'border-gray-100 hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overdue Badge */}
      {isOverdue && (
        <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1 animate-pulse">
          <AlertCircle size={12} />
          <span>OVERDUE</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 pr-2 line-clamp-2">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <Edit size={16} className="sm:w-5 sm:h-5" />
          </button>
          {isCreator() && (
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete task"
            >
              <Trash2 size={16} className="sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
        {task.description}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span 
          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${priority.bg} ${priority.text} ${priority.border}`}
        >
          <span>{priority.icon}</span>
          <span>{task.priority}</span>
        </span>
        <span 
          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${status.bg} ${status.text} ${status.border}`}
        >
          <span>{status.icon}</span>
          <span className="hidden sm:inline">{task.status}</span>
        </span>
      </div>

      {/* Footer Info */}
      <div className="space-y-3 pt-4 border-t-2 border-gray-100">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar size={14} className="sm:w-4 sm:h-4 text-gray-400" />
            <span className="font-medium">
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <UserIcon size={14} className="sm:w-4 sm:h-4 text-gray-400" />
            <span className="font-semibold text-gray-700 text-xs sm:text-sm">
              {getAssigneeName()}
            </span>
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            By <span className="font-semibold text-gray-700">{getCreatorName()}</span>
          </p>
          {isCreator() && (
            <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md text-xs font-bold shadow-sm">
              YOU
            </span>
          )}
        </div>
      </div>
    </div>
  );
};