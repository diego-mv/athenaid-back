import { Inject, Injectable } from '@nestjs/common'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { Schemas } from 'src/models'

@Injectable()
export class GetAllRoleUseCase {
	constructor(
		@Inject('RoleRepository') private readonly roleRepository: IRoleRepository
	) {}

	execute = async (): Promise<Schemas.RoleDto[]> => {
		return await this.roleRepository.getAll()
	}
}
