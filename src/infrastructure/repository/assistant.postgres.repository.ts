import { Injectable } from '@nestjs/common'
import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { IAssistantRepository } from 'src/domain/interface/repositories/assistant.repository'

@Injectable()
export class AssistantPostgresRepository
	extends GenericRepository<Entities.Assistant>
	implements IAssistantRepository
{
	constructor(repository: Repository<Entities.Assistant>) {
		super(repository)
	}
}
