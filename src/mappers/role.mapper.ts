import { Entities, Schemas } from 'src/models'
import { v4 as uuid } from 'uuid'

export const createRoleToRoleEntity = (
	roleData: Schemas.CreateRoleDto
): Entities.Role => {
	return {
		id: uuid(),
		name: roleData.name
	}
}
