import { Inject, Injectable } from '@nestjs/common'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { Schemas } from 'src/models'

@Injectable()
export class UpdateSubjectUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository
	) {}

	execute = async (
		subjectData: Schemas.SubjectDto
	): Promise<Schemas.SubjectDto | null> => {
		const subject = await this.subjectRepository.getById(subjectData.id)

		subject.name = subjectData.name
		subject.colorHex = subjectData.colorHex
		subject.code = subjectData.code
		subject.active = subjectData.active

		return await this.subjectRepository.update(subject)
	}
}
