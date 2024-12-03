import { Inject, Injectable } from '@nestjs/common'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Mapper } from 'src/mappers'
import { Entities, Schemas } from 'src/models'

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject('UserRepository') private readonly userRepository: IUserRepository,
		@Inject('RoleRepository') private readonly roleRepository: IRoleRepository
	) {}

	execute = async (
		userData: Schemas.CreateUserDto
	): Promise<Schemas.UserDto> => {
		const role = await this.roleRepository.getById(userData.roleId)
		const userEntity: Entities.User = Mapper.createUserSchemaToEntity(
			userData,
			role
		)
		const user = await this.userRepository.create(userEntity)

		return user
	}
}
