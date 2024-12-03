import { Entities } from 'src/models'
import { IGenericRepository } from './generic.repository'

export interface IUserRepository extends IGenericRepository<Entities.User> {
	getByEmail(email: string): Promise<Entities.User | null>
	updateRole(userId: string, role: Entities.Role): Promise<Entities.User | null>
	updateHashPass(userId: string, hash: string): Promise<Entities.User | null>
}
