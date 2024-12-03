import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'
import { PaginatedData } from 'src/domain/models/shared'

export interface ISectionRepository
	extends IGenericRepository<Entities.Section> {
	getBySubject(
		subjectId: string,
		page?: number,
		pageSize?: number,
		filter?: string
	): Promise<PaginatedData<Entities.Section>>
}
