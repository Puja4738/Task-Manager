import { z } from 'zod';

export const UpdateUserDto = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim()
    .optional(),
  email: z.string().email('Invalid email format').toLowerCase().trim().optional(),
});

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;