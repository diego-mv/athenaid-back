import { createRoleToRoleEntity } from './role.mapper'
import { createUserSchemaToEntity, mapUserDtoToUserJwt } from './user.mapper'

export const Mapper = {
	createUserSchemaToEntity,
	createRoleToRoleEntity,
	mapUserDtoToUserJwt
}
