import { Inject, Injectable } from '@nestjs/common'
import { SubjectHelper } from 'src/domain/helpers/subject.helper'
import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { Mapper } from 'src/mappers'
import { Entities, Schemas } from 'src/models'

@Injectable()
export class CreateSectionUseCase {
	constructor(
		@Inject('SectionRepository')
		private readonly sectionRepository: ISectionRepository,
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository
	) {}

	execute = async (
		sectionData: Schemas.CreateSectionDto
	): Promise<Entities.Section> => {
		await SubjectHelper.validateSubject(
			this.subjectRepository,
			sectionData.subject_id
		)

		const section = Mapper.createSectionDtoToEntity(sectionData)

		return await this.sectionRepository.create(section)
	}
}
