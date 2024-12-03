import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface IRoleRepository extends IGenericRepository<Entities.Role> {}
