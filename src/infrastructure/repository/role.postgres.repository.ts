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
}
