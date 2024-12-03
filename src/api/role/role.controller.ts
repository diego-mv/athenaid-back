import { Body, Controller, Post } from '@nestjs/common'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { CreateRoleUseCase } from './use-cases/create-role.uc'

@Controller('role')
export class RoleController {
	constructor(private readonly createRoleUC: CreateRoleUseCase) {}

	@Post()
	async createRole(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateRoleSchema))
		roleData: Schemas.CreateRoleDto
	) {
		return await this.createRoleUC.execute(roleData)
	}
}
