import { z } from 'zod'

export const LoginSchema = z.object({
	email: z
		.string()
		.min(1, 'Email is required')
		.max(64, 'Email must be at most 256 characters'),
	password: z.string().min(1, 'Password is required')
})

export type LoginDto = z.infer<typeof LoginSchema>
