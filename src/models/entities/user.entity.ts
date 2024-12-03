import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn
} from 'typeorm'
import { Role } from './role.entity'
import { AssistantApplication } from './assistant_application.entity'
import { EventApplication } from './event_application.entity'
import { Assistant } from './assistant.entity'
import { SubjectCoordinator } from './subject_coordinator.entity'

@Entity('users')
export class User {
	@PrimaryColumn()
	id: string

	@Column({ length: 256 })
	fullname: string

	@Column({ length: 256, unique: true })
	email: string

	@ManyToOne(() => Role, (role) => role.users, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'role_id' })
	role: Role

	@Column({ name: 'role_id' })
	role_id: string

	@JoinColumn({ name: 'pass_hash' })
	pass_hash?: string

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.user
	)
	assistantApplications?: AssistantApplication[]

	@OneToMany(
		() => EventApplication,
		(eventApplication) => eventApplication.createdBy
	)
	createdEvents?: EventApplication[]

	@OneToMany(() => Assistant, (assistant) => assistant.user, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	assistants?: Assistant[]

	@OneToMany(
		() => SubjectCoordinator,
		(subjectCoordinator) => subjectCoordinator.coordinator,
		{ nullable: true, onDelete: 'CASCADE' }
	)
	subjectCoordinators?: SubjectCoordinator[]
}
