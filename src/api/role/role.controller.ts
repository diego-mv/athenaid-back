import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { CreateRoleUseCase } from './use-cases/create-role.uc'
import { GetAllRoleUseCase } from './use-cases/get-all.uc'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
	constructor(
		private readonly createRoleUC: CreateRoleUseCase,
		private readonly getAllRolesUC: GetAllRoleUseCase
	) {}

	@Get()
	async getAll() {
		return await this.getAllRolesUC.execute()
	}

	@Post()
	async createRole(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateRoleSchema))
		roleData: Schemas.CreateRoleDto
	) {
		return await this.createRoleUC.execute(roleData)
	}
}
