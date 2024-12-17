import { Inject, Injectable } from '@nestjs/common'
import { CONSTANTS } from 'src/domain/constants'
import { IRoleRepository } from 'src/domain/interface/repositories/role.repository'
import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { PaginatedData } from 'src/domain/models/shared'
import { Mapper } from 'src/mappers'
import { Entities, Schemas } from 'src/models'

@Injectable()
export class GetByUserSubjectUseCase {
	constructor(
		@Inject('SubjectRepository')
		private readonly subjectRepository: ISubjectRepository,
		@Inject('RoleRepository')
		private readonly roleRepository: IRoleRepository
	) {}

	execute = async (
		userId: string,
		page: number = 1,
		pageSize: number = 10,
		filter: string = ''
	): Promise<PaginatedData<Schemas.SubjectDto>> => {
		const filterBy: (keyof Entities.Subject)[] = [
			'code',
			'name',
			'colorHex',
			'id'
		]
		const roleUser = await this.roleRepository.getByUserId(userId)
		const isAdmin = roleUser.name.toLocaleUpperCase() === CONSTANTS.ROLES.ADMIN
		const subjects: PaginatedData<Entities.Subject> = isAdmin
			? await this.subjectRepository.getAllPaginated(
					page,
					pageSize,
					filter,
					filterBy
				)
			: await this.subjectRepository.getByUserId(
					userId,
					page,
					pageSize,
					filter,
					filterBy
				)

		return Mapper.paginatedSubjectEntityToDto(subjects)
	}
}
