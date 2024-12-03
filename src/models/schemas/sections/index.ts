import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const SectionSchema = z.object({
	id: z
		.string()
		.min(1, 'Id is required')
		.max(64, 'Id must be at most 64 characters'),
	code: z
		.string()
		.min(1, 'Code is required')
		.max(64, 'Code must be at most 64 characters'),
	active: z.boolean(),
	subject_id: z
		.string()
		.min(1, 'Subject Id is required')
		.max(64, 'Subject Id must be at most 64 characters')
})

export const CreateSectionSchema = SectionSchema.omit({
	active: true,
	id: true
})

export const UpdateSectionSchema = SectionSchema.omit({ subject_id: true })

export class SectionDto extends createZodDto(SectionSchema) {}
export class CreateSectionDto extends createZodDto(CreateSectionSchema) {}
export class UpdateSectionDto extends createZodDto(UpdateSectionSchema) {}
