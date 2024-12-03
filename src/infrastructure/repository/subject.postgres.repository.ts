import { Injectable } from '@nestjs/common'
import { Entities } from 'src/models'
import { Repository } from 'typeorm'
import { GenericRepository } from './generic.postgres.repository'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'

@Injectable()
export class SubjectPostgresRepository
	extends GenericRepository<Entities.Subject>
	implements ISubjectRepository
{
	constructor(repository: Repository<Entities.Subject>) {
		super(repository)
	}
}
