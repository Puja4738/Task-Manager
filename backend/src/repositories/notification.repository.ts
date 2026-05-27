import { Notification, INotification } from '../models/Notification.model';

export class NotificationRepository {
  async create(notificationData: Partial<INotification>): Promise<INotification> {
    const notification = new Notification(notificationData);
    return await notification.save();
  }

  async findByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ userId })
      .populate('taskId', 'title')
      .sort('-createdAt')
      .limit(50);
  }

  async findUnreadByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ userId, read: false })
      .populate('taskId', 'title')
      .sort('-createdAt');
  }

  async markAsRead(id: string): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ userId, read: false }, { read: true });
  }
}