import { z } from 'zod';

export const addNewCourseSchema = z.object({
    name: z.string().min(1, { message: 'Course name is required' }),
    description: z.string().min(1, { message: 'Course description is required' }),
})