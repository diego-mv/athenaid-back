import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const SubjectSchema = z.object({
	id: z
		.string()
		.min(1, 'Id is required')
		.max(64, 'Id must be at most 64 characters'),
	code: z
		.string()
		.min(3, 'Code is required')
		.max(64, 'Code must be at most 64 characters'),
	name: z
		.string()
		.min(1, 'Name is required')
		.max(64, 'Name must be at most 64 characters'),
	colorHex: z
		.string()
		.min(1, 'color Hex is required')
		.max(64, 'color Hex must be at most 64 characters'),
	active: z.boolean().default(true)
})

export const CreateSubjectSchema = SubjectSchema.omit({
	active: true,
	id: true
}).extend({
	coordinator_id: z.string().nullable().optional()
})

export class CreateSubjectDto extends createZodDto(CreateSubjectSchema) {}
