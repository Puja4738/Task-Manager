import express from 'express';
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  getMyAssignedTasks,
  getMyCreatedTasks,
  getOverdueTasks,
} from '../controllers/task.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';

const router = express.Router();

router.use(protect);

router.post('/', validate(CreateTaskDto), createTask);
router.get('/', getAllTasks);
router.get('/assigned/me', getMyAssignedTasks);
router.get('/created/me', getMyCreatedTasks);
router.get('/overdue', getOverdueTasks);
router.get('/:id', getTask);
router.put('/:id', validate(UpdateTaskDto), updateTask);
router.delete('/:id', deleteTask);

export default router;