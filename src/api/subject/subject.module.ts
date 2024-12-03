import { Module } from '@nestjs/common'
import {
	getDataSource,
	getSubjectCoordinatorRepository,
	getSubjectRepository,
	getUserRepository
} from 'src/dependency-injection'
import { SubjectController } from './subject.controller'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'

@Module({
	controllers: [SubjectController],
	providers: [
		CreateSubjectUseCase,
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
