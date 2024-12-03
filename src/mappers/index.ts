import { createRoleToRoleEntity } from './role.mapper'
import {
	createUserSchemaToEntity,
	userEntityToDto,
	userDtoToUserJwt
} from './user.mapper'

export const Mapper = {
	createUserSchemaToEntity,
	createRoleToRoleEntity,
	userDtoToUserJwt,
	userEntityToDto
}
