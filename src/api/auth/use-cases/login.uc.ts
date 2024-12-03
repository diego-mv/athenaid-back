import { Inject, Injectable } from '@nestjs/common'
import { LoginError } from 'src/domain/errors/auth'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Schemas } from 'src/models'
import { JwtTokenService } from '../jwt-token.service'
import { Mapper } from 'src/mappers'

@Injectable()
export class LoginUseCase {
	constructor(
		@Inject('UserRepository') private readonly userRepository: IUserRepository,
		private readonly jwtTokenService: JwtTokenService
	) {}

	execute = async (
		loginData: Schemas.LoginDto
	): Promise<{ accessToken: string }> => {
		const user = await this.userRepository.getByEmail(loginData.email)

		//TODO: validar pass con hash
		if (false && loginData.password !== user.pass_hash) {
			console.log('Error pass')
			throw new LoginError()
		}

		const payload = Mapper.mapUserDtoToUserJwt(user)

		const accessToken = this.jwtTokenService.generateToken(payload)
		return { accessToken }
	}
}
