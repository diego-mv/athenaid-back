import { z } from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(64, 'Email must be at most 256 characters'),
	password: z.string().min(1, 'Password is required')
})

export const UpdatePasswordSchema = z.object({
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(64, 'Password must be at most 64 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(/[\W_]/, 'Password must contain at least one special character')
})

export type LoginDto = z.infer<typeof LoginSchema>

export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>
