import { Body, Controller, Post } from '@nestjs/common'
import { Schemas } from 'src/models'
import { LoginUseCase } from './use-cases/login.uc'
import { Pipes } from 'src/infrastructure/server/pipes'

@Controller('auth')
export class AuthController {
	constructor(private readonly loginUseCase: LoginUseCase) {}

	@Post('login')
	async login(
		@Body(new Pipes.ZodValidationPipe(Schemas.LoginSchema))
		loginDto: Schemas.LoginDto
	) {
		return await this.loginUseCase.execute(loginDto)
	}
}
