import { TaskRepository } from '../repositories/task.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import { CreateTaskDtoType, UpdateTaskDtoType } from '../dtos/task.dto';
import { ITask } from '../models/Task.model';
import { getIO } from '../config/socket';
import { Logger } from '../utils/logger.util';
import mongoose from 'mongoose';

/**
 * Task Service - Handles task business logic
 */
export class TaskService {
  private taskRepository: TaskRepository;
  private notificationRepository: NotificationRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
    this.notificationRepository = new NotificationRepository();
  }

  /**
   * Creates a new task
   * @param taskData - Task creation data
   * @param creatorId - ID of the user creating the task
   * @returns Created task
   */
  async createTask(
    taskData: CreateTaskDtoType,
    creatorId: string
  ): Promise<ITask> {
    try {
      // Validate due date is in the future - ONLY FOR NEW TASKS
      const dueDate = new Date(taskData.dueDate);
      const now = new Date();
      
      // Set both dates to start of day for fair comparison
      dueDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      if (dueDate < now) {
        throw new Error('Due date must be in the future');
      }

      console.log('Creating task with data:', {
        title: taskData.title,
        dueDate: dueDate,
        creatorId,
        assignedToId: taskData.assignedToId,
      });

      // Create task with proper ObjectId conversion
      const task = await this.taskRepository.create({
        title: taskData.title,
        description: taskData.description,
        dueDate: dueDate,
        priority: taskData.priority,
        status: taskData.status || 'To Do',
        creatorId: new mongoose.Types.ObjectId(creatorId),
        assignedToId: new mongoose.Types.ObjectId(taskData.assignedToId),
      } as any);

      console.log('Task created successfully:', task._id);

      // Create notification for assignee if different from creator
      if (taskData.assignedToId !== creatorId) {
        await this.createAssignmentNotification(task);
      }

      // Emit real-time event
      this.emitTaskCreated(task);

      Logger.info('Task created', { taskId: task._id.toString(), creatorId });

      return task;
    } catch (error: any) {
      console.error('Task creation error:', error);
      Logger.error('Task creation failed', error);
      throw error;
    }
  }

  /**
   * Updates a task
   * @param taskId - Task ID
   * @param taskData - Task update data
   * @param userId - ID of the user updating the task
   * @returns Updated task
   */
  async updateTask(
    taskId: string,
    taskData: UpdateTaskDtoType,
    userId: string
  ): Promise<ITask> {
    try {
      const existingTask = await this.taskRepository.findById(taskId);
      if (!existingTask) {
        throw new Error('Task not found');
      }

      // Prepare update data - NO DATE VALIDATION FOR UPDATES
      const updateData: any = {};

      if (taskData.title !== undefined) updateData.title = taskData.title;
      if (taskData.description !== undefined) updateData.description = taskData.description;
      if (taskData.priority !== undefined) updateData.priority = taskData.priority;
      if (taskData.status !== undefined) updateData.status = taskData.status;
      
      // Convert assignedToId to ObjectId if provided
      if (taskData.assignedToId !== undefined) {
        updateData.assignedToId = new mongoose.Types.ObjectId(taskData.assignedToId);
      }

      // Handle due date - allow any date for updates (past or future)
      if (taskData.dueDate !== undefined) {
        updateData.dueDate = new Date(taskData.dueDate);
      }

      console.log('Updating task:', taskId, 'with data:', updateData);

      // Update task
      const updatedTask = await this.taskRepository.update(taskId, updateData);
      if (!updatedTask) {
        throw new Error('Failed to update task');
      }

      // If assignee changed, create notification
      if (
        taskData.assignedToId &&
        taskData.assignedToId !== existingTask.assignedToId.toString()
      ) {
        await this.createAssignmentNotification(updatedTask);
      }

      // Emit real-time event
      this.emitTaskUpdated(updatedTask);

      Logger.info('Task updated', { taskId, userId });

      return updatedTask;
    } catch (error: any) {
      console.error('Task update error:', error);
      Logger.error('Task update failed', error);
      throw error;
    }
  }

  /**
   * Deletes a task
   * @param taskId - Task ID
   * @param userId - ID of the user deleting the task
   */
  async deleteTask(taskId: string, userId: string): Promise<void> {
    try {
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      console.log('===== DELETE TASK DEBUG =====');
      console.log('Raw task data:', {
        creatorId: task.creatorId,
        assignedToId: task.assignedToId,
        userId: userId
      });

      // Convert to plain object to avoid TypeScript issues
      let taskObj: any;
      try {
        taskObj = task.toObject();
      } catch (e) {
        taskObj = JSON.parse(JSON.stringify(task));
      }
      
      // Get creator ID
      const creatorId = taskObj.creatorId?._id || taskObj.creatorId;
      const creatorIdStr = String(creatorId);
      
      // Get user ID
      const userIdStr = String(userId);

      console.log('Comparison:', {
        creator: creatorIdStr,
        user: userIdStr,
        isCreator: creatorIdStr === userIdStr
      });
      console.log('===== END DEBUG =====');

      // ONLY CREATOR CAN DELETE - Check permission
      if (creatorIdStr !== userIdStr) {
        throw new Error('Only the creator can delete this task');
      }

      await this.taskRepository.delete(taskId);
      this.emitTaskDeleted(taskId);
      Logger.info('Task deleted', { taskId, userId });
    } catch (error: any) {
      console.error('Delete task error:', error);
      throw error;
    }
  }

  /**
   * Gets all tasks with optional filters
   */
  async getAllTasks(filters: {
    status?: string;
    priority?: string;
    sortBy?: string;
  }): Promise<ITask[]> {
    const query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    const sortBy = filters.sortBy || '-createdAt';

    return await this.taskRepository.findAll(query, sortBy);
  }

  /**
   * Gets a single task by ID
   */
  async getTaskById(taskId: string): Promise<ITask> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  /**
   * Gets tasks assigned to a user
   */
  async getTasksByAssignee(userId: string): Promise<ITask[]> {
    return await this.taskRepository.findByAssignee(userId);
  }

  /**
   * Gets tasks created by a user
   */
  async getTasksByCreator(userId: string): Promise<ITask[]> {
    return await this.taskRepository.findByCreator(userId);
  }

  /**
   * Gets overdue tasks
   */
  async getOverdueTasks(): Promise<ITask[]> {
    return await this.taskRepository.findOverdue();
  }

  /**
   * Creates an assignment notification
   * @private
   */
  private async createAssignmentNotification(task: ITask): Promise<void> {
    try {
      const notification = await this.notificationRepository.create({
        userId: task.assignedToId,
        taskId: task._id,
        message: `You have been assigned to task: ${task.title}`,
      } as any);

      // Emit real-time notification
      const io = getIO();
      io.to(`user:${task.assignedToId.toString()}`).emit('notification', notification);
    } catch (error) {
      Logger.error('Failed to create/emit notification', error);
    }
  }

  /**
   * Emits task created event
   * @private
   */
  private emitTaskCreated(task: ITask): void {
    try {
      const io = getIO();
      io.emit('task:created', task);
    } catch (error) {
      Logger.error('Failed to emit task:created event', error);
    }
  }

  /**
   * Emits task updated event
   * @private
   */
  private emitTaskUpdated(task: ITask): void {
    try {
      const io = getIO();
      io.emit('task:updated', task);
    } catch (error) {
      Logger.error('Failed to emit task:updated event', error);
    }
  }

  /**
   * Emits task deleted event
   * @private
   */
  private emitTaskDeleted(taskId: string): void {
    try {
      const io = getIO();
      io.emit('task:deleted', { taskId });
    } catch (error) {
      Logger.error('Failed to emit task:deleted event', error);
    }
  }
}