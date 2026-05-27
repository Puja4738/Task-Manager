import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/user.service';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => userService.getNotifications(),
  });
};

export const useUnreadNotifications = () => {
  return useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: () => userService.getUnreadNotifications(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};