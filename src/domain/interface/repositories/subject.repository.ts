import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'
import { PaginatedData } from 'src/domain/models/shared'

export interface ISubjectRepository
	extends IGenericRepository<Entities.Subject> {
	getByUserId: (
		userId: string,
		page?: number,
		pageSize?: number,
		filter?: string,
		filterBy?: (keyof Entities.Subject)[]
	) => Promise<PaginatedData<Entities.Subject>>
}
