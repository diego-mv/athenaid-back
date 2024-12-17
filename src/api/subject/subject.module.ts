import { Module } from '@nestjs/common'
import {
	getDataSource,
	getRoleRepository,
	getSubjectCoordinatorRepository,
	getSubjectRepository,
	getUserRepository
} from 'src/dependency-injection'
import { SubjectController } from './subject.controller'
import { AddCoordinatorUseCase } from './use-cases/add-coordinator.uc'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'
import { DeleteSubjectUseCase } from './use-cases/delete-subject.uc'
import { GetByUserSubjectUseCase } from './use-cases/get-all-subject.uc'
import { RemoveCoordinatorUseCase } from './use-cases/remove-coordinator.uc'
import { UpdateSubjectUseCase } from './use-cases/update-subject.uc'

@Module({
	controllers: [SubjectController],
	providers: [
		UpdateSubjectUseCase,
		CreateSubjectUseCase,
		DeleteSubjectUseCase,
		AddCoordinatorUseCase,
		RemoveCoordinatorUseCase,
		GetByUserSubjectUseCase,
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
		},
		{
			provide: 'RoleRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getRoleRepository(dataSource)
			}
		}
	]
})
export class SubjectModule {}
