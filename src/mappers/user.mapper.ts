import { Entities, Schemas } from 'src/models'
import { v4 as uuid } from 'uuid'

export const createUserSchemaToEntity = (
	schema: Schemas.CreateUserDto,
	role: Entities.Role
): Entities.User => {
	return {
		id: uuid(),
		email: schema.email,
		fullname: schema.fullname,
		role: role,
		role_id: role.id
	}
}

export const mapUserDtoToUserJwt = (
	user: Entities.User
): Schemas.UserJwtPayload => {
	return {
		id: user.id,
		email: user.email,
		fullname: user.fullname,
		role: user.role
	}
}
