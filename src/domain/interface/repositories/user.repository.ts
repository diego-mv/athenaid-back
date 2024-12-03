import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface IUserRepository extends IGenericRepository<Entities.User> {}
