import apiClient from './api.service';
import { ApiResponse, Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * Task service for handling task operations
 */
export const taskService = {
  /**
   * Get all tasks with optional filters
   */
  getAllTasks: async (filters?: {
    status?: string;
    priority?: string;
    sortBy?: string;
  }): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);

    const response = await apiClient.get<ApiResponse<Task[]>>(
      `/tasks?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Get a single task by ID
   */
  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data;
  },

  /**
   * Create a new task
   */
  createTask: async (data: CreateTaskDto): Promise<Task> => {
    const response = await apiClient.post<ApiResponse<Task>>('/tasks', data);
    return response.data.data;
  },

  /**
   * Update a task
   */
  updateTask: async (id: string, data: UpdateTaskDto): Promise<Task> => {
    const response = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a task
   */
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
  },

  /**
   * Get tasks assigned to current user
   */
  getMyAssignedTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks/assigned/me');
    return response.data.data;
  },

  /**
   * Get tasks created by current user
   */
  getMyCreatedTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks/created/me');
    return response.data.data;
  },

  /**
   * Get overdue tasks
   */
  getOverdueTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<ApiResponse<Task[]>>('/tasks/overdue');
    return response.data.data;
  },
};