import React, { createContext, useContext, useEffect } from 'react';
import { socketService } from '../services/socket.service';
import { useAuth } from './AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface SocketContextType {
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      if (token) {
        socketService.connect(token);
        setIsConnected(true);

        // Listen for task events
        socketService.on('task:created', (_task) => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          toast.success('New task created!');
        });

        socketService.on('task:updated', (_task) => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          // queryClient.invalidateQueries({ queryKey: ['task'] });
          toast.success('Task updated!');
        });

        socketService.on('task:deleted', (_payload) => {
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
          toast.success('Task deleted!');
        });

        // Listen for notifications
        socketService.on('notification', (notification) => {
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          toast(notification.message, {
            icon: '🔔',
            duration: 5000,
          });
        });
      }
    }

    return () => {
      if (user) {
        socketService.off('task:created');
        socketService.off('task:updated');
        socketService.off('task:deleted');
        socketService.off('notification');
      }
    };
  }, [user, queryClient]);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};