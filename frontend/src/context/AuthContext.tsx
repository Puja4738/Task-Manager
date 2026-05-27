import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginDto, RegisterDto } from '../types';
import { authService } from '../services/auth.service';
import { socketService } from '../services/socket.service';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        socketService.connect(token);
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginDto) => {
    try {
      const response = await authService.login(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      socketService.connect(response.token);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await authService.register(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      socketService.connect(response.token);
      toast.success('Registration successful!');
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      socketService.disconnect();
      toast.success('Logged out successfully!');
    } catch (error: any) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};