import apiClient from './api.service';
import { ApiResponse, AuthResponse, LoginDto, RegisterDto, User } from '../types';

/**
 * Authentication service for handling auth operations
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      data
    );
    return response.data.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      data
    );
    return response.data.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  /**
   * Get current user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },
};