import { Inject, Injectable } from '@nestjs/common'
import { ErrorUpdateRole } from 'src/domain/errors/users'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { IUserRepository } from 'src/domain/interface/repositories/user.repository'
import { Mapper } from 'src/mappers'
import { Schemas } from 'src/models'

@Injectable()
export class UpdateUserRoleUseCase {
	constructor(
		@Inject('UserRepository') private readonly userRepository: IUserRepository,
		@Inject('RoleRepository') private readonly roleRepository: IRoleRepository
	) {}

	execute = async (
		userData: Schemas.UpdateUserRoleDto
	): Promise<Schemas.UserDto> => {
		const role = await this.roleRepository.getById(userData.roleId)
		const user = await this.userRepository.getById(userData.userId)

		if (!role) {
			throw new ErrorUpdateRole('Role not found')
		}
		if (!user) {
			throw new ErrorUpdateRole('User not found')
		}

		const updated = await this.userRepository.updateRole(user.id, role)
		return Mapper.userEntityToDto(updated)
	}
}
