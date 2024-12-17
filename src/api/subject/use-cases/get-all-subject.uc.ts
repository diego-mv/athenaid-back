import { Inject, Injectable } from '@nestjs/common'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { PaginatedData } from 'src/domain/models/shared'
import { Mapper } from 'src/mappers'
import { Entities, Schemas } from 'src/models'

@Injectable()
export class GetByUserSubjectUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository
	) {}

	execute = async (
		userId: string,
		page: number = 1,
		pageSize: number = 10,
		filter: string = ''
	): Promise<PaginatedData<Schemas.SubjectDto>> => {
		const filterBy: (keyof Entities.Subject)[] = [
			'code',
			'name',
			'colorHex',
			'id'
		]
		const subjects = await this.subjectRepository.getByUserId(
			userId,
			page,
			pageSize,
			filter,
			filterBy
		)
		return Mapper.paginatedSubjectEntityToDto(subjects)
	}
}
