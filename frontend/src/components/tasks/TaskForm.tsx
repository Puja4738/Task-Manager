import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateTaskDto, Task, TaskPriority, TaskStatus, User } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useUsers } from '../../hooks/useUsers';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().min(1, 'Assignee is required'),
});

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskDto) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Named export
export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { data: users = [] } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(taskSchema),
    defaultValues: task
      ? {
          title: task.title,
          description: task.description,
          dueDate: new Date(task.dueDate).toISOString().split('T')[0],
          priority: task.priority,
          status: task.status,
          assignedToId: typeof task.assignedToId === 'object' 
            ? (task.assignedToId as User)._id 
            : task.assignedToId,
        }
      : {
          priority: TaskPriority.MEDIUM,
          status: TaskStatus.TODO,
        },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        priority: task.priority,
        status: task.status,
        assignedToId: typeof task.assignedToId === 'object' 
          ? (task.assignedToId as User)._id 
          : task.assignedToId,
      });
    }
  }, [task, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        placeholder="Enter task title"
        error={errors.title?.message}
        {...register('title')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Enter task description"
          className={`input-field ${errors.description ? 'border-red-500' : ''}`}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <Input
        label="Due Date"
        type="date"
        error={errors.dueDate?.message}
        {...register('dueDate')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          className={`input-field ${errors.priority ? 'border-red-500' : ''}`}
          {...register('priority')}
        >
          {Object.values(TaskPriority).map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          className={`input-field ${errors.status ? 'border-red-500' : ''}`}
          {...register('status')}
        >
          {Object.values(TaskStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign To
        </label>
        <select
          className={`input-field ${errors.assignedToId ? 'border-red-500' : ''}`}
          {...register('assignedToId')}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        {errors.assignedToId && (
          <p className="mt-1 text-sm text-red-600">{errors.assignedToId.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};