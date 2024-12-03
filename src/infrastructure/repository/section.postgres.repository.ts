import { Injectable } from '@nestjs/common'
import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'
import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { PaginatedData } from 'src/domain/models/shared'

@Injectable()
export class SectionPostgresRepository
	extends GenericRepository<Entities.Section>
	implements ISectionRepository
{
	constructor(repository: Repository<Entities.Section>) {
		super(repository)
	}

	getBySubject = async (
		subjectId: string,
		page?: number,
		pageSize?: number,
		filter?: string
	): Promise<PaginatedData<Entities.Section>> => {
		return await this.getPaginated(
			{ subject_id: subjectId, active: true },
			{ page, pageSize, filter, filterBy: ['code', 'id'] }
		)
	}
}
