import { PaginatedData } from 'src/domain/models/shared'
import { Entities, Schemas } from 'src/models'

export const paginatedSubjectEntityToDto = (
	paginated: PaginatedData<Entities.Subject>
): PaginatedData<Schemas.SubjectDto> => {
	const subjects: Schemas.SubjectDto[] = paginated.data.map((subject) => {
		return {
			active: subject.active,
			code: subject.code,
			colorHex: subject.colorHex,
			id: subject.id,
			name: subject.name
		}
	})
	return {
		...paginated,
		data: subjects
	}
}
