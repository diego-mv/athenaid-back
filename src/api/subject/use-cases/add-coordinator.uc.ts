import { Inject, Injectable } from '@nestjs/common'
import { ErrorUpdateSubject } from 'src/domain/errors/subject'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { ISubjectCoordinatorRepository } from 'src/domain/interface/repositories/subject_coordinator.repository'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { SubjectHelper } from 'src/domain/helpers/subject.helper'
import { UserHelper } from 'src/domain/helpers/user.helper'
import { Entities, Schemas } from 'src/models'
import { v4 as uuid } from 'uuid'

@Injectable()
export class AddCoordinatorUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository,
		@Inject('SubjectCoordinatorRepository')
		private readonly subjectCoordinatorRepository: ISubjectCoordinatorRepository,
		@Inject('UserRepository') private readonly userRepository: IUserRepository
	) {}

	execute = async (
		subjectCoordinatorData: Schemas.SubjectCoordinatorDto
	): Promise<void> => {
		try {
			await SubjectHelper.validateSubject(
				this.subjectRepository,
				subjectCoordinatorData.subject_id
			)
			await UserHelper.validateUser(
				this.userRepository,
				subjectCoordinatorData.coordinator_id
			)

			const existSubjectCoordinator =
				await this.subjectCoordinatorRepository.get({
					coordinator_id: subjectCoordinatorData.coordinator_id,
					subject_id: subjectCoordinatorData.subject_id
				})

			if (existSubjectCoordinator.length > 0) {
				throw new ErrorUpdateSubject('Coordinator already exist')
			}

			const subjectCoordinator: Entities.SubjectCoordinator = {
				id: uuid(),
				coordinator_id: subjectCoordinatorData.coordinator_id,
				subject_id: subjectCoordinatorData.subject_id
			}

			await this.subjectCoordinatorRepository.create(subjectCoordinator)
		} catch (err) {
			throw new ErrorUpdateSubject(err.message)
		}
	}
}
