import apiClient from './api.service';
import { ApiResponse, User, Notification } from '../types';

/**
 * User service for handling user operations
 */
export const userService = {
  /**
   * Get all users
   */
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  },

  /**
   * Get user by ID
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  },

  /**
   * Update user profile
   */
  updateUser: async (
    id: string,
    data: { name?: string; email?: string }
  ): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  },

  /**
   * Get user notifications
   */
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<ApiResponse<Notification[]>>(
      '/users/notifications'
    );
    return response.data.data;
  },

  /**
   * Get unread notifications
   */
  getUnreadNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<ApiResponse<Notification[]>>(
      '/users/notifications/unread'
    );
    return response.data.data;
  },

  /**
   * Mark notification as read
   */
  markNotificationAsRead: async (id: string): Promise<Notification> => {
    const response = await apiClient.put<ApiResponse<Notification>>(
      `/users/notifications/${id}/read`
    );
    return response.data.data;
  },

  /**
   * Mark all notifications as read
   */
  markAllNotificationsAsRead: async (): Promise<void> => {
    await apiClient.put('/users/notifications/read-all');
  },
};