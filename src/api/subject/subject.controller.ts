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
import { AddCoordinatorUseCase } from './use-cases/add-coordinator.uc'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'
import { DeleteSubjectUseCase } from './use-cases/delete-subject.uc'
import { RemoveCoordinatorUseCase } from './use-cases/remove-coordinator.uc'
import { UpdateSubjectUseCase } from './use-cases/update-subject.uc'
import { GetByUserSubjectUseCase } from './use-cases/get-all-subject.uc'
import { CurrentUser } from 'src/infrastructure/server/decorators/current-user.decorator'

@ApiTags('subject')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('subject')
export class SubjectController {
	constructor(
		private readonly createSubjectUC: CreateSubjectUseCase,
		private readonly updateSubjectUC: UpdateSubjectUseCase,
		private readonly removeCoordinatorUC: RemoveCoordinatorUseCase,
		private readonly deleteSubjectUC: DeleteSubjectUseCase,
		private readonly addCoordinatorUC: AddCoordinatorUseCase,
		private readonly getByUserSubjectUC: GetByUserSubjectUseCase
	) {}

	@Get()
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
	async getAll(
		@CurrentUser() currentUser: Schemas.UserJwtPayload,
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('filter') filter?: string
	) {
		return await this.getByUserSubjectUC.execute(
			currentUser.id,
			page,
			pageSize,
			filter
		)
	}

	@Post()
	async createSubject(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateSubjectSchema))
		subjectData: Schemas.CreateSubjectDto
	) {
		return await this.createSubjectUC.execute(subjectData)
	}

	@Put()
	async updateSubject(
		@Body(new Pipes.ZodValidationPipe(Schemas.SubjectSchema))
		subjectData: Schemas.SubjectDto
	) {
		return await this.updateSubjectUC.execute(subjectData)
	}

	@Put('add-coordinator')
	async addCoordinator(
		@Body(new Pipes.ZodValidationPipe(Schemas.SubjectCoordinatorSchema))
		subjectCoordinatorData: Schemas.SubjectCoordinatorDto
	) {
		return await this.addCoordinatorUC.execute(subjectCoordinatorData)
	}

	@Delete('remove-coordinator')
	async removeCoordinator(
		@Body(new Pipes.ZodValidationPipe(Schemas.SubjectCoordinatorSchema))
		subjectCoordinatorData: Schemas.SubjectCoordinatorDto
	) {
		return await this.removeCoordinatorUC.execute(subjectCoordinatorData)
	}

	@Delete(':subjectId')
	async deleteSubject(@Param('subjectId') subjectId: string) {
		return await this.deleteSubjectUC.execute(subjectId)
	}
}
