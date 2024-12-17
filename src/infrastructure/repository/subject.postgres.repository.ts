import { Injectable } from '@nestjs/common'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { PaginatedData } from 'src/domain/models/shared'
import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'

@Injectable()
export class SubjectPostgresRepository
	extends GenericRepository<Entities.Subject>
	implements ISubjectRepository
{
	constructor(repository: Repository<Entities.Subject>) {
		super(repository)
	}

	getByUserId = async (
		userId: string,
		page?: number,
		pageSize?: number,
		filter?: string,
		filterBy?: (keyof Entities.Subject)[]
	): Promise<PaginatedData<Entities.Subject>> => {
		page = page ?? 1
		pageSize = pageSize ?? 10
		filter = filter ?? undefined
		filterBy = filterBy ?? ['code', 'colorHex', 'id', 'name']

		const queryBuilder = this.repository
			.createQueryBuilder('subject')
			.leftJoinAndSelect('subject.subjectCoordinatorsRel', 'coordinator')
			.leftJoinAndSelect('subject.sectionsRel', 'section')
			.leftJoinAndSelect('section.assistantsRel', 'assistant')
			.where('coordinator.coordinator_id = :userId', { userId })
			.orWhere('assistant.user_id = :userId', { userId })

		const data = this.getPaginatedByQueryBuilder(queryBuilder, {
			page,
			pageSize,
			filter,
			filterBy
		})

		return data
	}

	getAllPaginated = (
		page?: number,
		pageSize?: number,
		filter?: string,
		filterBy?: (keyof Entities.Subject)[]
	): Promise<PaginatedData<Entities.Subject>> => {
		return this.getPaginated({}, { page, pageSize, filter, filterBy })
	}
}
