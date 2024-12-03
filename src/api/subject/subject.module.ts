import { Module } from '@nestjs/common'
import {
	getDataSource,
	getSubjectCoordinatorRepository,
	getSubjectRepository,
	getUserRepository
} from 'src/dependency-injection'
import { SubjectController } from './subject.controller'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'
import { UpdateSubjectUseCase } from './use-cases/update-subject.uc'
import { AddCoordinatorUseCase } from './use-cases/add-coordinator.uc'
import { RemoveCoordinatorUseCase } from './use-cases/remove-coordinator.uc'

@Module({
	controllers: [SubjectController],
	providers: [
		UpdateSubjectUseCase,
		CreateSubjectUseCase,
		AddCoordinatorUseCase,
		RemoveCoordinatorUseCase,
		{
			provide: 'SubjectRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getSubjectRepository(dataSource)
			}
		},
		{
			provide: 'SubjectCoordinatorRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getSubjectCoordinatorRepository(dataSource)
			}
		},
		{
			provide: 'UserRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getUserRepository(dataSource)
			}
		}
	]
})
export class SubjectModule {}
