import { Injectable } from '@nestjs/common'
import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { ISubjectCoordinatorRepository } from 'src/domain/interface/repositories/subject_coordinator.repository'

@Injectable()
export class SubjectCoordinatorPostgresRepository
	extends GenericRepository<Entities.SubjectCoordinator>
	implements ISubjectCoordinatorRepository
{
	constructor(repository: Repository<Entities.SubjectCoordinator>) {
		super(repository)
	}
}
