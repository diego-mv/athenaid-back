import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { Subject } from './subject.entity'
import { User } from './user.entity'
import { Period } from './period.entity'
import { EventApplication } from './event_application.entity'
import { StateApplication } from './state_application.entity'

@Entity('assistant_application')
export class AssistantApplication {
	@PrimaryColumn()
	id: string

	@Column({ name: 'subject_id' })
	subject_id: string

	@ManyToOne(() => Subject, (subject) => subject.assistantApplicationsRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'subject_id' })
	subjectRel: Subject

	@Column({ name: 'user_id' })
	user_id: string

	@ManyToOne(() => User, (user) => user.assistantApplicationsRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'user_id' })
	userRel: User

	@Column({ name: 'period_id' })
	period_id: string

	@ManyToOne(() => Period, (period) => period.assistantApplicationsRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'period_id' })
	periodRel: Period

	@Column({ name: 'event_id' })
	event_id: string

	@ManyToOne(
		() => EventApplication,
		(eventApplication) => eventApplication.assistantApplicationsRel,
		{ nullable: true, onDelete: 'CASCADE' }
	)
	@JoinColumn({ name: 'event_id' })
	eventRel: EventApplication

	@Column({ name: 'state_id' })
	state_id: string

	@ManyToOne(
		() => StateApplication,
		(stateApplication) => stateApplication.assistantApplicationsRel,
		{ nullable: true, onDelete: 'SET NULL' }
	)
	@JoinColumn({ name: 'state_id' })
	stateRel: StateApplication

	@Column({ name: 'last_editor_id' })
	last_editor_id: string

	@ManyToOne(() => User, (user) => user.assistantApplicationsRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'last_editor_id' })
	lastEditorRel: User

	@Column()
	date: Date
}
