import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../types';
import toast from 'react-hot-toast';

export const useTasks = (filters?: {
  status?: string;
  priority?: string;
  sortBy?: string;
}) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => taskService.getAllTasks(filters),
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
};

export const useMyAssignedTasks = () => {
  return useQuery({
    queryKey: ['tasks', 'assigned'],
    queryFn: () => taskService.getMyAssignedTasks(),
  });
};

export const useMyCreatedTasks = () => {
  return useQuery({
    queryKey: ['tasks', 'created'],
    queryFn: () => taskService.getMyCreatedTasks(),
  });
};

export const useOverdueTasks = () => {
  return useQuery({
    queryKey: ['tasks', 'overdue'],
    queryFn: () => taskService.getOverdueTasks(),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create task');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      taskService.updateTask(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
      toast.success('Task updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update task');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      toast.error(errorMessage);
      console.error('Delete error:', error.response?.data);
    },
  });
};