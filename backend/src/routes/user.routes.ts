import express from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { UpdateUserDto } from '../dtos/user.dto';

const router = express.Router();

router.use(protect);

router.get('/', getAllUsers);
router.get('/notifications', getNotifications);
router.get('/notifications/unread', getUnreadNotifications);
router.put('/notifications/read-all', markAllNotificationsAsRead);
router.put('/notifications/:id/read', markNotificationAsRead);
router.get('/:id', getUser);
router.put('/:id', validate(UpdateUserDto), updateUser);

export default router;