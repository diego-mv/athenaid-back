import { getPostgresDBManager } from './infrastructure/db/postgres.connection'
import { RolePostgresRepository } from './infrastructure/repository/role.postgres.repository'
import { SectionPostgresRepository } from './infrastructure/repository/section.postgres.repository'
import { SubjectPostgresRepository } from './infrastructure/repository/subject.postgres.repository'
import { SubjectCoordinatorPostgresRepository } from './infrastructure/repository/subject_coordinator.postgres.repository'
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

export const getSubjectRepository = async (DataSource) =>
	new SubjectPostgresRepository(DataSource.getRepository(Entities.Subject))

export const getSubjectCoordinatorRepository = async (DataSource) =>
	new SubjectCoordinatorPostgresRepository(
		DataSource.getRepository(Entities.SubjectCoordinator)
	)

export const getSectionRepository = async (DataSource) =>
	new SectionPostgresRepository(DataSource.getRepository(Entities.Section))
