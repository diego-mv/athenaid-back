import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RolePostgresRepository
	extends GenericRepository<Entities.Role>
	implements IRoleRepository
{
	constructor(repository: Repository<Entities.Role>) {
		super(repository)
	}

	getByUserId = async (userId: string): Promise<Entities.Role> => {
		return await this.repository
			.createQueryBuilder('roles')
			.leftJoinAndSelect('roles.usersRel', 'users')
			.where('users.id= :userId', { userId })
			.getOne()
	}
}
