import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface IAssistantRepository
	extends IGenericRepository<Entities.Assistant> {}
