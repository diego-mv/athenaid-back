import { Inject, Injectable } from '@nestjs/common'
import { ErrorUpdateSubject } from 'src/domain/errors/subject'
import { ISubjectCoordinatorRepository } from 'src/domain/interface/repositories/subject_coordinator.repository'
import { Schemas } from 'src/models'

@Injectable()
export class RemoveCoordinatorUseCase {
	constructor(
		@Inject('SubjectCoordinatorRepository')
		private readonly subjectCoordinatorRepository: ISubjectCoordinatorRepository
	) {}

	execute = async (
		subjectCoordinatorData: Schemas.SubjectCoordinatorDto
	): Promise<void> => {
		try {
			const subjectCoordinators = await this.subjectCoordinatorRepository.get({
				coordinator_id: subjectCoordinatorData.coordinator_id,
				subject_id: subjectCoordinatorData.subject_id
			})

			if (subjectCoordinators.length === 0) {
				throw new ErrorUpdateSubject('Coordinator no exist')
			}

			await this.subjectCoordinatorRepository.delete(subjectCoordinators[0].id)
		} catch (err) {
			throw new ErrorUpdateSubject(err.message)
		}
	}
}
