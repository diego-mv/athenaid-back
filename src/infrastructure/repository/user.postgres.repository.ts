import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserPostgresRepository
	extends GenericRepository<Entities.User>
	implements IUserRepository
{
	constructor(readonly repository: Repository<Entities.User>) {
		super(repository)
	}

	getByEmail = async (email: string) => {
		return await this.repository.findOne({
			where: { email }
		})
	}

	updateRole = async (
		userId: string,
		role: Entities.Role
	): Promise<Entities.User | null> => {
		const user = await this.getById(userId)
		user.role_id = role.id
		user.roleRel = role
		this.repository.update({ id: userId }, user)

		return await this.getById(userId)
	}

	updateHashPass = async (
		userId: string,
		hash: string
	): Promise<Entities.User> => {
		const user = await this.getById(userId)
		user.pass_hash = hash
		this.repository.update({ id: userId }, user)

		return await this.getById(userId)
	}
}
