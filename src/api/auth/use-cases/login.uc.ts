import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { ErrorLogin } from 'src/domain/errors/auth'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Mapper } from 'src/mappers'
import { Schemas } from 'src/models'
import { JwtTokenService } from '../jwt-token.service'

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

		if (!user) {
			throw new ErrorLogin()
		}

		const isPasswordValid = await bcrypt.compare(
			loginData.password,
			user.pass_hash
		)

		if (!isPasswordValid) {
			throw new ErrorLogin()
		}

		const payload = Mapper.userDtoToUserJwt(user)

		const accessToken = this.jwtTokenService.generateToken(payload)
		return { accessToken }
	}
}
