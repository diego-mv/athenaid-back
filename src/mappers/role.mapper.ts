import { generateUid } from 'src/infrastructure/id'
import { Entities, Schemas } from 'src/models'

export const createRoleToRoleEntity = (
	roleData: Schemas.CreateRoleDto
): Entities.Role => {
	return {
		id: generateUid(),
		name: roleData.name
	}
}
