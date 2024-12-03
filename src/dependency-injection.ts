import { getPostgresDBManager } from './infrastructure/db/postgres.connection'
import { RolePostgresRepository } from './infrastructure/repository/role.postgres.repository'
import { UserPostgresRepository } from './infrastructure/repository/user.postgres.repository'
import { Entities } from './models'

// db
export const getDataSource = async () =>
	await getPostgresDBManager(process.env.DATABASE_NAME)

// Repositories
export const getUserRepository = async (dataSource) =>
	new UserPostgresRepository(dataSource.getRepository(Entities.User))
export const getRoleRepository = async (dataSource) =>
	new RolePostgresRepository(dataSource.getRepository(Entities.Role))
