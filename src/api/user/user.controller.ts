import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { CreateUserUseCase } from './use-cases/create-user.uc'
import { UpdateUserRoleUseCase } from './use-cases/update-user-role'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'
import { CurrentUser } from 'src/infrastructure/server/decorators/current-user.decorator'

@Controller('user')
export class UserController {
	constructor(
		private readonly createUserUC: CreateUserUseCase,
		private readonly updateUserRoleUC: UpdateUserRoleUseCase
	) {}

	@Post()
	async createUser(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateUserSchema))
		createUser: Schemas.CreateUserDto
	) {
		return await this.createUserUC.execute(createUser)
	}

	@UseGuards(JwtAuthGuard)
	@Put('role')
	async updateRole(
		@CurrentUser() currentUser: Schemas.UserJwtPayload,
		@Body(new Pipes.ZodValidationPipe(Schemas.UpdateUserRoleSchema))
		updateUserRole: Schemas.UpdateUserRoleDto
	) {
		console.log(currentUser)
		return await this.updateUserRoleUC.execute(updateUserRole)
	}
}
