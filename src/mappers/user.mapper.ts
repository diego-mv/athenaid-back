import { generateUid } from 'src/infrastructure/id'
import { Entities, Schemas } from 'src/models'

export const createUserSchemaToEntity = (
	schema: Schemas.CreateUserDto,
	role: Entities.Role
): Entities.User => {
	return {
		id: generateUid(),
		email: schema.email,
		fullname: schema.fullname,
		roleRel: role,
		role_id: role.id
	}
}

export const userDtoToUserJwt = (
	user: Entities.User
): Schemas.UserJwtPayload => {
	return {
		id: user.id,
		email: user.email,
		fullname: user.fullname,
		role: user.roleRel
	}
}

export const userEntityToDto = (entity: Entities.User): Schemas.UserDto => {
	return {
		email: entity.email,
		fullname: entity.fullname,
		id: entity.id,
		roleId: entity.role_id
	}
}
