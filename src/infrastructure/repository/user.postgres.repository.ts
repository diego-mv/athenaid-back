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

	getUserByEmail = async (email: string) => {
		return await this.repository.findOne({ where: { email } })
	}
}
