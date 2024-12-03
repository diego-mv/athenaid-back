import { createRoleToRoleEntity } from './role.mapper'
import {
	createSectionDtoToEntity,
	paginatedSectionEntityToDto
} from './section.mapper'
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
	paginatedSectionEntityToDto
}
