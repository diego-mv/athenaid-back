import { z } from 'zod'

export const UserSchema = z.object({
	id: z
		.string()
		.min(1, 'Id is required')
		.max(64, 'Id must be at most 64 characters'),
	fullname: z
		.string()
		.min(1, 'Fullname is required')
		.max(256, 'Fullname must be at most 256 characters'),
	email: z
		.string()
		.email('Invalid email format')
		.max(256, 'Email must be at most 256 characters'),
	roleId: z.string().optional()
})

export type UserDto = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({
	id: true
})

export type CreateUserDto = z.infer<typeof CreateUserSchema>
