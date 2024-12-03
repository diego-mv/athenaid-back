import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface ISubjectRepository
	extends IGenericRepository<Entities.Subject> {}
