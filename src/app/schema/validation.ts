import * as z from 'zod';

export const UserLoginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(4, 'Password is too short'),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {message: 'Name is too short'})
    .max(64, {message: 'Name is too long'}),
  surName: z
    .string()
    .min(2, {message: "Surname is too short"})
    .max(64, {message: 'Name is too long'}),
  email: z
    .email('Invalid email address'),
  password: z
    .string()
    .min(5, 'Password is too short'),
  confirmPassword: z
    .string()
    .min(5, 'Repeat your password'),
  telephone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
  ,
  employment: z
    .string()
  ,
  userAgreement: z
    .boolean()
  ,
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match'
});