import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';
import { NotificationRepository } from '../repositories/notification.repository';
import { TaskPriority, TaskStatus } from '../models/Task.model';
import mongoose from 'mongoose';

// Mock the repositories
jest.mock('../repositories/task.repository');
jest.mock('../repositories/notification.repository');
jest.mock('../config/socket', () => ({
  getIO: jest.fn(() => ({
    emit: jest.fn(),
    to: jest.fn(() => ({ emit: jest.fn() })),
  })),
}));

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepository: jest.Mocked<TaskRepository>;
  let mockNotificationRepository: jest.Mocked<NotificationRepository>;

  beforeEach(() => {
    taskService = new TaskService();
    mockTaskRepository = TaskRepository.prototype as jest.Mocked<TaskRepository>;
    mockNotificationRepository =
      NotificationRepository.prototype as jest.Mocked<NotificationRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        assignedToId: 'user123',
      };

      const creatorId = 'creator123';

      const mockTask = {
        _id: new mongoose.Types.ObjectId('task123'),
        title: taskData.title,
        description: taskData.description,
        dueDate: new Date(taskData.dueDate),
        priority: taskData.priority,
        status: taskData.status,
        creatorId: new mongoose.Types.ObjectId(creatorId),
        assignedToId: new mongoose.Types.ObjectId(taskData.assignedToId),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      mockTaskRepository.create = jest.fn().mockResolvedValue(mockTask);
      mockNotificationRepository.create = jest.fn().mockResolvedValue({});

      const result = await taskService.createTask(taskData, creatorId);

      expect(result).toEqual(mockTask);
      expect(mockTaskRepository.create).toHaveBeenCalledWith({
        title: taskData.title,
        description: taskData.description,
        dueDate: expect.any(Date),
        priority: taskData.priority,
        status: taskData.status,
        creatorId: expect.any(mongoose.Types.ObjectId),
        assignedToId: expect.any(mongoose.Types.ObjectId),
      });
    });

    it('should throw error if due date is in the past', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        assignedToId: 'user123',
      };

      const creatorId = 'creator123';

      await expect(taskService.createTask(taskData, creatorId)).rejects.toThrow(
        'Due date must be in the future'
      );
    });

    it('should create notification when assignee is different from creator', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        assignedToId: 'differentUser',
      };

      const creatorId = 'creator123';

      const mockTask = {
        _id: new mongoose.Types.ObjectId('task123'),
        title: taskData.title,
        description: taskData.description,
        dueDate: new Date(taskData.dueDate),
        priority: taskData.priority,
        status: taskData.status,
        creatorId: new mongoose.Types.ObjectId(creatorId),
        assignedToId: new mongoose.Types.ObjectId(taskData.assignedToId),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      mockTaskRepository.create = jest.fn().mockResolvedValue(mockTask);
      mockNotificationRepository.create = jest.fn().mockResolvedValue({});

      await taskService.createTask(taskData, creatorId);

      expect(mockNotificationRepository.create).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully', async () => {
      const taskId = 'task123';
      const userId = 'user123';
      const updateData = {
        title: 'Updated Title',
        status: TaskStatus.IN_PROGRESS,
      };

      const existingTask = {
        _id: new mongoose.Types.ObjectId(taskId),
        title: 'Old Title',
        description: 'Old Description',
        dueDate: new Date(),
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
        creatorId: new mongoose.Types.ObjectId(userId),
        assignedToId: new mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      const updatedTask = {
        ...existingTask,
        title: updateData.title,
        status: updateData.status,
      } as any;

      mockTaskRepository.findById = jest.fn().mockResolvedValue(existingTask);
      mockTaskRepository.update = jest.fn().mockResolvedValue(updatedTask);

      const result = await taskService.updateTask(taskId, updateData, userId);

      expect(result).toEqual(updatedTask);
      expect(mockTaskRepository.update).toHaveBeenCalledWith(taskId, {
        title: updateData.title,
        status: updateData.status,
      });
    });

    it('should throw error if task not found', async () => {
      mockTaskRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(
        taskService.updateTask('invalidId', {}, 'user123')
      ).rejects.toThrow('Task not found');
    });

    it('should update assignee and create notification', async () => {
      const taskId = 'task123';
      const userId = 'user123';
      const newAssigneeId = 'newUser456';
      const updateData = {
        assignedToId: newAssigneeId,
      };

      const existingTask = {
        _id: new mongoose.Types.ObjectId(taskId),
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
        creatorId: new mongoose.Types.ObjectId(userId),
        assignedToId: new mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      const updatedTask = {
        ...existingTask,
        assignedToId: new mongoose.Types.ObjectId(newAssigneeId),
      } as any;

      mockTaskRepository.findById = jest.fn().mockResolvedValue(existingTask);
      mockTaskRepository.update = jest.fn().mockResolvedValue(updatedTask);
      mockNotificationRepository.create = jest.fn().mockResolvedValue({});

      await taskService.updateTask(taskId, updateData, userId);

      expect(mockNotificationRepository.create).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('should allow creator to delete task', async () => {
      const taskId = 'task123';
      const userId = 'creator123';

      const mockTask = {
        _id: new mongoose.Types.ObjectId(taskId),
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
        creatorId: {
          toString: () => userId,
        },
        assignedToId: new mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      mockTaskRepository.findById = jest.fn().mockResolvedValue(mockTask);
      mockTaskRepository.delete = jest.fn().mockResolvedValue(mockTask);

      await taskService.deleteTask(taskId, userId);

      expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId);
    });

    it('should throw error if non-creator tries to delete', async () => {
      const taskId = 'task123';
      const userId = 'otherUser';

      const mockTask = {
        _id: new mongoose.Types.ObjectId(taskId),
        title: 'Test Task',
        description: 'Test Description',
        dueDate: new Date(),
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
        creatorId: {
          toString: () => 'creator123',
        },
        assignedToId: new mongoose.Types.ObjectId('creator123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      } as any;

      mockTaskRepository.findById = jest.fn().mockResolvedValue(mockTask);

      await expect(taskService.deleteTask(taskId, userId)).rejects.toThrow(
        'Only the creator can delete this task'
      );
    });

    it('should throw error if task not found', async () => {
      mockTaskRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(
        taskService.deleteTask('invalidId', 'user123')
      ).rejects.toThrow('Task not found');
    });
  });

  describe('getAllTasks', () => {
    it('should get all tasks with filters', async () => {
      const mockTasks = [
        {
          _id: new mongoose.Types.ObjectId('task1'),
          title: 'Task 1',
          status: TaskStatus.TODO,
          priority: TaskPriority.HIGH,
        },
        {
          _id: new mongoose.Types.ObjectId('task2'),
          title: 'Task 2',
          status: TaskStatus.TODO,
          priority: TaskPriority.MEDIUM,
        },
      ] as any;

      mockTaskRepository.findAll = jest.fn().mockResolvedValue(mockTasks);

      const result = await taskService.getAllTasks({
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
      });

      expect(result).toEqual(mockTasks);
      expect(mockTaskRepository.findAll).toHaveBeenCalledWith(
        { status: TaskStatus.TODO, priority: TaskPriority.HIGH },
        '-createdAt'
      );
    });
  });

  describe('getTaskById', () => {
    it('should get a task by id', async () => {
      const taskId = 'task123';
      const mockTask = {
        _id: new mongoose.Types.ObjectId(taskId),
        title: 'Test Task',
      } as any;

      mockTaskRepository.findById = jest.fn().mockResolvedValue(mockTask);

      const result = await taskService.getTaskById(taskId);

      expect(result).toEqual(mockTask);
      expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
    });

    it('should throw error if task not found', async () => {
      mockTaskRepository.findById = jest.fn().mockResolvedValue(null);

      await expect(taskService.getTaskById('invalidId')).rejects.toThrow(
        'Task not found'
      );
    });
  });
});