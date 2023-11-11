import { z } from 'zod';
import { RegexValidations } from '@/lib/utils';

export const regFormSchema = z.object({
  username: z.string().min(1),
  password: z
    .string()
    .regex(RegexValidations.hasNumber, 'Must include number')
    .regex(RegexValidations.hasLowerCase, 'Must include lowercase Letter')
    .regex(RegexValidations.hasUpperCase, 'Must include uppercase Letter')
    .regex(RegexValidations.hasSpecialChar, 'Must Include special symbol')
    .min(6),
  confirmPassword: z.string().min(6),
});
