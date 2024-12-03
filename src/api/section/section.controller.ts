import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common'
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { DeleteSectionUseCase } from './use-cases/delete-section.uc'
import { CreateSectionUseCase } from './use-cases/create-section.uc'
import { UpdateSectionUseCase } from './use-cases/update-section.uc'
import { GetSectionBySubjectUseCase } from './use-cases/get-by-subject.uc'

@ApiTags('section')
@UseGuards(JwtAuthGuard)
@ApiSecurity('bearer')
@Controller('section')
export class SectionController {
	constructor(
		private readonly getSectionBySubjectUseCase: GetSectionBySubjectUseCase,
		private readonly createSectionUC: CreateSectionUseCase,
		private readonly updateSectionUC: UpdateSectionUseCase,
		private readonly deleteSectionUC: DeleteSectionUseCase
	) {}

	@Get('by-subject/:subjectId')
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Page number',
		type: Number
	})
	@ApiQuery({
		name: 'pageSize',
		required: false,
		description: 'Number of items per page',
		type: Number
	})
	@ApiQuery({
		name: 'filter',
		required: false,
		description: 'Search filter for the results',
		type: String
	})
	async getBySubject(
		@Param('subjectId') subjectId: string,
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('filter') filter?: string
	) {
		return await this.getSectionBySubjectUseCase.execute(
			subjectId,
			page,
			pageSize,
			filter
		)
	}

	@Post()
	async createSection(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateSectionSchema))
		createSection: Schemas.CreateSectionDto
	) {
		return await this.createSectionUC.execute(createSection)
	}

	@Put()
	async updateSection(
		@Body(new Pipes.ZodValidationPipe(Schemas.UpdateSectionSchema))
		updateSection: Schemas.UpdateSectionDto
	) {
		return await this.updateSectionUC.execute(updateSection)
	}

	@Delete(':sectionId')
	async deleteSection(@Param('sectionId') sectionId: string) {
		return await this.deleteSectionUC.execute(sectionId)
	}
}
