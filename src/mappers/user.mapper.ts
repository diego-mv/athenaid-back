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
		role: role
	}
}
