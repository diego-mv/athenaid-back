import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Entities } from 'src/models'

export class UserHelper {
	static async validateUser(
		userRepository: IUserRepository,
		userId: string
	): Promise<Entities.User> {
		const user = await userRepository.getById(userId)
		if (!user) {
			throw new Error('User not found')
		}
		return user
	}
}
