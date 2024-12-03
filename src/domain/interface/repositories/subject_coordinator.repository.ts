import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface ISubjectCoordinatorRepository
	extends IGenericRepository<Entities.SubjectCoordinator> {}
