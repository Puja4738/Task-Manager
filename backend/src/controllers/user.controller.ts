import { Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const userService = new UserService();
const notificationService = new NotificationService();

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    next(error);
  }
};

export const getUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.params.id !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'You can only update your own profile',
      });
      return;
    }

    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    next(error);
  }
};

export const getNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notifications = await notificationService.getUserNotifications(req.userId!);
    res.status(200).json({ success: true, data: notifications });
  } catch (error: any) {
    next(error);
  }
};

export const getUnreadNotifications = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notifications = await notificationService.getUnreadNotifications(req.userId!);
    res.status(200).json({ success: true, data: notifications });
  } catch (error: any) {
    next(error);
  }
};

export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);
    res.status(200).json({ success: true, data: notification });
  } catch (error: any) {
    next(error);
  }
};

export const markAllNotificationsAsRead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await notificationService.markAllAsRead(req.userId!);
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error: any) {
    next(error);
  }
};