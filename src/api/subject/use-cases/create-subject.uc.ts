import { Inject, Injectable } from '@nestjs/common'
import { ErrorCreateSubject } from 'src/domain/errors/subject'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { ISubjectCoordinatorRepository } from 'src/domain/interface/repositories/subject_coordinator.repository'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Entities, Schemas } from 'src/models'
import { v4 as uuid } from 'uuid'

@Injectable()
export class CreateSubjectUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository,
		@Inject('SubjectCoordinatorRepository')
		private readonly subjectCoordinatorRepository: ISubjectCoordinatorRepository,
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository
	) {}

	execute = async (
		subjectData: Schemas.CreateSubjectDto
	): Promise<Entities.Subject | null> => {
		const subject: Entities.Subject = {
			id: uuid(),
			active: true,
			code: subjectData.code,
			colorHex: subjectData.colorHex,
			name: subjectData.name
		}

		if (subjectData.coordinator_id) {
			const coordinatorUser = await this.userRepository.getById(
				subjectData.coordinator_id
			)

			if (!coordinatorUser) {
				throw new ErrorCreateSubject('Coordinator user not found')
			}

			const subject_coordinator: Entities.SubjectCoordinator = {
				id: uuid(),
				coordinator_id: subjectData.coordinator_id,
				subject_id: subject.id
			}
			const newSubject = await this.subjectRepository.create(subject)
			await this.subjectCoordinatorRepository.create(subject_coordinator)

			return newSubject
		}

		return await this.subjectRepository.create(subject)
	}
}
