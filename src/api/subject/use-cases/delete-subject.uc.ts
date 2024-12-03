import { Inject, Injectable } from '@nestjs/common'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { SubjectHelper } from 'src/domain/helpers/subject.helper'

@Injectable()
export class DeleteSubjectUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository
	) {}

	execute = async (subjectId: string): Promise<void> => {
		const subject = await SubjectHelper.validateSubject(
			this.subjectRepository,
			subjectId
		)
		subject.active = false

		await this.subjectRepository.update(subject)
	}
}
