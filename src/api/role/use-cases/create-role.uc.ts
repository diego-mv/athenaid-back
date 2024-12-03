import { Inject, Injectable } from '@nestjs/common'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { Mapper } from 'src/mappers'
import { Schemas } from 'src/models'

@Injectable()
export class CreateRoleUseCase {
	constructor(
		@Inject('RoleRepository') private readonly roleRepository: IRoleRepository
	) {}

	execute = async (
		roleData: Schemas.CreateRoleDto
	): Promise<Schemas.UserDto> => {
		const roleEntity = Mapper.createRoleToRoleEntity(roleData)
		return await this.roleRepository.create(roleEntity)
	}
}
