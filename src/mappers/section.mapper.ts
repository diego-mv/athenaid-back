import { PaginatedData } from 'src/domain/models/shared'
import { Entities, Schemas } from 'src/models'
import { v4 as uuid } from 'uuid'

export const createSectionDtoToEntity = (
	createDto: Schemas.CreateSectionDto
): Entities.Section => {
	return {
		id: uuid(),
		code: createDto.code,
		active: true,
		subject_id: createDto.subject_id
	}
}

export const paginatedSectionEntityToDto = (
	paginated: PaginatedData<Entities.Section>
): PaginatedData<Schemas.SectionDto> => {
	const sections = paginated.data.map((section) => {
		return {
			id: section.id,
			active: section.active,
			code: section.code,
			subject_id: section.subject_id
		}
	})
	return {
		...paginated,
		data: sections
	}
}
