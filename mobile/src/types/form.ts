import { z } from 'zod';
import { registerSchema, signInSchema } from '../constants/schema';

export type SignInFormValues = z.infer<typeof signInSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;