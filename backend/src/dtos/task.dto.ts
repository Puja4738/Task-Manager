import { z } from 'zod';
import { TaskStatus, TaskPriority } from '../models/Task.model';

export const CreateTaskDto = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  description: z.string().min(1, 'Description is required').trim(),
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  priority: z.nativeEnum(TaskPriority),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().min(1, 'Assignee is required'),
});

export const UpdateTaskDto = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .trim()
    .optional(),
  description: z.string().min(1, 'Description is required').trim().optional(),
  dueDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    })
    .optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  assignedToId: z.string().min(1, 'Assignee is required').optional(),
});

export type CreateTaskDtoType = z.infer<typeof CreateTaskDto>;
export type UpdateTaskDtoType = z.infer<typeof UpdateTaskDto>;