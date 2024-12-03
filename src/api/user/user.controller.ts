import { Body, Controller, Post } from '@nestjs/common'
import { Pipes } from 'src/infrastructure/server/pipes'
import { Schemas } from 'src/models'
import { CreateUserUseCase } from './create-user.uc'

@Controller('user')
export class UserController {
	constructor(private readonly createUserUC: CreateUserUseCase) {}

	@Post()
	async createUser(
		@Body(new Pipes.ZodValidationPipe(Schemas.CreateUserSchema))
		createUser: Schemas.CreateUserDto
	) {
		return await this.createUserUC.execute(createUser)
	}
}
