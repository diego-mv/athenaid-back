import { Module } from '@nestjs/common'
import {
	getDataSource,
	getSectionRepository,
	getSubjectRepository
} from 'src/dependency-injection'
import { SectionController } from './section.controller'
import { CreateSectionUseCase } from './use-cases/create-section.uc'
import { DeleteSectionUseCase } from './use-cases/delete-section.uc'
import { UpdateSectionUseCase } from './use-cases/update-section.uc'
import { GetSectionBySubjectUseCase } from './use-cases/get-by-subject.uc'

@Module({
	controllers: [SectionController],
	providers: [
		GetSectionBySubjectUseCase,
		CreateSectionUseCase,
		UpdateSectionUseCase,
		DeleteSectionUseCase,
		{
			provide: 'SectionRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getSectionRepository(dataSource)
			}
		},
		{
			provide: 'SubjectRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getSubjectRepository(dataSource)
			}
		}
	]
})
export class SectionModule {}
