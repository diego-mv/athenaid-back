import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CreateSubjectUseCase } from './use-cases/create-subject.uc'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'

@ApiTags('subject')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
@Controller('subject')
export class SubjectController {
	constructor(private readonly createSubjectUC: CreateSubjectUseCase) {}

	@Post()
	async createSubject(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateSubjectSchema))
		subjectData: Schemas.CreateSubjectDto
	) {
		return await this.createSubjectUC.execute(subjectData)
	}
}
