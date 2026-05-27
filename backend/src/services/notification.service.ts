import { NotificationRepository } from '../repositories/notification.repository';
import { INotification } from '../models/Notification.model';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async getUserNotifications(userId: string): Promise<INotification[]> {
    return await this.notificationRepository.findByUser(userId);
  }

  async getUnreadNotifications(userId: string): Promise<INotification[]> {
    return await this.notificationRepository.findUnreadByUser(userId);
  }

  async markAsRead(notificationId: string): Promise<INotification> {
    const notification = await this.notificationRepository.markAsRead(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
  }
}