import { Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { AuthRequest } from '../middlewares/auth.middleware';

const taskService = new TaskService();

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.createTask(req.body, req.userId!);
    res.status(201).json({ success: true, data: task });
  } catch (error: any) {
    next(error);
  }
};

export const getAllTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, priority, sortBy } = req.query;
    const tasks = await taskService.getAllTasks({
      status: status as string,
      priority: priority as string,
      sortBy: sortBy as string,
    });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    next(error);
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.userId!);
    res.status(200).json({ success: true, data: task });
  } catch (error: any) {
    next(error);
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('===== CONTROLLER DELETE =====');
    console.log('Task ID from params:', req.params.id);
    console.log('User ID from auth:', req.userId);
    console.log('Type of userId:', typeof req.userId);
    console.log('===== END CONTROLLER =====');

    await taskService.deleteTask(req.params.id, req.userId!);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error: any) {
    console.error('❌ Delete task error:', error.message);
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyAssignedTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await taskService.getTasksByAssignee(req.userId!);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    next(error);
  }
};

export const getMyCreatedTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await taskService.getTasksByCreator(req.userId!);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    next(error);
  }
};

export const getOverdueTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await taskService.getOverdueTasks();
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error: any) {
    next(error);
  }
};