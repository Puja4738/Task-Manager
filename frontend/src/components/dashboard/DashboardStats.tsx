import React from 'react';
import { CheckCircle, Clock, AlertCircle, ListTodo } from 'lucide-react';
import { Task, TaskStatus } from '../../types';

interface DashboardStatsProps {
  assignedTasks: Task[];
  createdTasks: Task[];
  overdueTasks: Task[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  assignedTasks,
  //createdTasks,
  overdueTasks,
}) => {
  const completedTasks = assignedTasks.filter(
    (task) => task.status === TaskStatus.COMPLETED
  ).length;

  const inProgressTasks = assignedTasks.filter(
    (task) => task.status === TaskStatus.IN_PROGRESS
  ).length;

  const completionRate = assignedTasks.length > 0 
    ? Math.round((completedTasks / assignedTasks.length) * 100) 
    : 0;

  const stats = [
    {
      title: 'Assigned to Me',
      value: assignedTasks.length,
      icon: ListTodo,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12%',
    },
    {
      title: 'In Progress',
      value: inProgressTasks,
      icon: Clock,
      gradient: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50',
      textColor: 'text-amber-600',
      change: '+5%',
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      change: `${completionRate}%`,
    },
    {
      title: 'Overdue',
      value: overdueTasks.length,
      icon: AlertCircle,
      gradient: 'from-red-500 to-red-600',
      bg: 'bg-red-50',
      textColor: 'text-red-600',
      change: overdueTasks.length > 0 ? '⚠️' : '✅',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-slide-up">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 hover:shadow-xl hover:scale-105 hover:border-blue-200 transition-all duration-300 group overflow-hidden"
          >
            {/* Gradient Background Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2">
                  {stat.title}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className={`text-xs font-bold ${stat.textColor}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.bg} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.textColor}`} />
              </div>
            </div>

            {/* Decorative Circle */}
            <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500`} />
          </div>
        );
      })}
    </div>
  );
};