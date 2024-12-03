import { Inject, Injectable } from '@nestjs/common'
import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'
import { PaginatedData } from 'src/domain/models/shared'
import { Mapper } from 'src/mappers'
import { Schemas } from 'src/models'

@Injectable()
export class GetSectionBySubjectUseCase {
	constructor(
		@Inject('SectionRepository')
		private readonly sectionRepository: ISectionRepository
	) {}

	execute = async (
		subjectId: string,
		page?: number,
		pageSize?: number,
		filter?: string
	): Promise<PaginatedData<Schemas.SectionDto>> => {
		const data = await this.sectionRepository.getBySubject(
			subjectId,
			page,
			pageSize,
			filter
		)

		return Mapper.paginatedSectionEntityToDto(data)
	}
}
