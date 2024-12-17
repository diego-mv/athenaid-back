import { createRoleToRoleEntity } from './role.mapper'
import {
	createSectionDtoToEntity,
	paginatedSectionEntityToDto
} from './section.mapper'
import { paginatedSubjectEntityToDto } from './subject.mapper'
import {
	createUserSchemaToEntity,
	userDtoToUserJwt,
	userEntityToDto
} from './user.mapper'

export const Mapper = {
	createUserSchemaToEntity,
	createRoleToRoleEntity,
	userDtoToUserJwt,
	userEntityToDto,
	createSectionDtoToEntity,
	paginatedSectionEntityToDto,
	paginatedSubjectEntityToDto
}
