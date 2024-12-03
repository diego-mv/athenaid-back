import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'
import { Schemas } from 'src/models'
import { LoginUseCase } from './use-cases/login.uc'
import { Pipes } from 'src/infrastructure/server/pipes'
import { UpdatePasswordUseCase } from './use-cases/update_pass.uc'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'
import { CurrentUser } from 'src/infrastructure/server/decorators/current-user.decorator'
import { ApiSecurity, ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly loginUseCase: LoginUseCase,
		private readonly updatePasswordUC: UpdatePasswordUseCase
	) {}

	@Post('login')
	async login(
		@Body(new Pipes.ZodValidationPipe(Schemas.LoginSchema))
		loginDto: Schemas.LoginDto
	) {
		return await this.loginUseCase.execute(loginDto)
	}

	@UseGuards(JwtAuthGuard)
	@ApiSecurity('bearer')
	@Put('password')
	async updatePassword(
		@CurrentUser() currentUser: Schemas.UserJwtPayload,
		@Body(new Pipes.ZodValidationPipe(Schemas.UpdatePasswordSchema))
		updatePassDto: Schemas.UpdatePasswordDto
	) {
		return await this.updatePasswordUC.execute(
			currentUser.id,
			updatePassDto.password
		)
	}
}
