import { z } from 'zod'

export const RoleSchema = z.object({
	id: z
		.string()
		.min(1, 'Id is required')
		.max(64, 'Id must be at most 64 characters'),
	name: z
		.string()
		.min(1, 'Name is required')
		.max(64, 'Name must be at most 64 characters')
})

export type RoleDto = z.infer<typeof RoleSchema>

export const CreateRoleSchema = RoleSchema.omit({
	id: true
})

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>
