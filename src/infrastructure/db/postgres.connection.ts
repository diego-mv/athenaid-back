import { Entities } from 'src/models'
import { DataSource } from 'typeorm'

const allEntities = [
	Entities.Assistant,
	Entities.AssistantApplication,
	Entities.EventApplication,
	Entities.Period,
	Entities.Role,
	Entities.Section,
	Entities.StateApplication,
	Entities.Subject,
	Entities.SubjectCoordinator,
	Entities.User
]

export const getPostgresDBManager = async (dbName: string) => {
	const dataSource = new DataSource({
		type: 'postgres',
		host: process.env.DATABASE_HOST,
		port: Number(process.env.DATABASE_PORT || 5432),
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: dbName,
		entities: allEntities,
		synchronize: false
	})

	await dataSource.initialize()

	return dataSource
}
