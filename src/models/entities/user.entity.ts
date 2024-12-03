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

	@ManyToOne(() => Role, (role) => role.usersRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'role_id' })
	roleRel: Role

	@Column({ name: 'role_id' })
	role_id: string

	@Column({ name: 'pass_hash' })
	pass_hash?: string

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.userRel
	)
	assistantApplicationsRel?: AssistantApplication[]

	@OneToMany(
		() => EventApplication,
		(eventApplication) => eventApplication.createdByRel
	)
	createdEventsRel?: EventApplication[]

	@OneToMany(() => Assistant, (assistant) => assistant.userRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	assistantsRel?: Assistant[]

	@OneToMany(
		() => SubjectCoordinator,
		(subjectCoordinator) => subjectCoordinator.coordinatorRel,
		{ nullable: true, onDelete: 'CASCADE' }
	)
	subjectCoordinatorsRel?: SubjectCoordinator[]
}
