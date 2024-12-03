import { z } from 'zod'
import { RoleDto } from '../roles'
import { createZodDto } from 'nestjs-zod'

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

export const CreateUserSchema = UserSchema.omit({
	id: true
})

export const UpdateUserRoleSchema = z.object({
	userId: z
		.string()
		.min(1, 'userId is required')
		.max(64, 'userId must be at most 64 characters'),
	roleId: z
		.string()
		.min(1, 'roleId is required')
		.max(64, 'roleId must be at most 64 characters')
})

export class UpdateUserRoleDto extends createZodDto(UpdateUserRoleSchema) {}
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UserDto extends createZodDto(UserSchema) {}

export type UserJwtPayload = {
	id: string
	fullname: string
	email: string
	role: RoleDto
}
