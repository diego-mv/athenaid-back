import { Inject, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { ErrorUpdatePassword } from 'src/domain/errors/auth'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Mapper } from 'src/mappers'
import { JwtTokenService } from '../jwt-token.service'

@Injectable()
export class UpdatePasswordUseCase {
	constructor(
		@Inject('UserRepository') private readonly userRepository: IUserRepository,
		private readonly jwtTokenService: JwtTokenService
	) {}

	execute = async (
		userId: string,
		password: string
	): Promise<{ accessToken: string }> => {
		const user = await this.userRepository.getById(userId)

		if (!user) {
			throw new ErrorUpdatePassword('User not found')
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const updatedUser = await this.userRepository.updateHashPass(
			userId,
			hashedPassword
		)
		const payload = Mapper.userDtoToUserJwt(updatedUser)

		const accessToken = this.jwtTokenService.generateToken(payload)

		return { accessToken }
	}
}
