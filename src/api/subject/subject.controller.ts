import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { AddCoordinatorUseCase } from './use-cases/add-coordinator.uc'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'
import { DeleteSubjectUseCase } from './use-cases/delete-subject.uc'
import { RemoveCoordinatorUseCase } from './use-cases/remove-coordinator.uc'
import { UpdateSubjectUseCase } from './use-cases/update-subject.uc'

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
		private readonly addCoordinatorUC: AddCoordinatorUseCase
	) {}

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
