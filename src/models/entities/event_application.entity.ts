import {
	Entity,
	PrimaryColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany
} from 'typeorm'
import { Period } from './period.entity'
import { User } from './user.entity'
import { AssistantApplication } from './assistant_application.entity'

@Entity('event_application')
export class EventApplication {
	@PrimaryColumn()
	id: string

	@Column({ length: 1024, nullable: true })
	description: string

	@ManyToOne(() => Period, (period) => period.eventApplications, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'period_id' })
	period: Period

	@Column()
	startdate: Date

	@Column()
	enddate: Date

	@ManyToOne(() => User, (user) => user.createdEvents, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'created_by' })
	createdBy: User

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.event
	)
	assistantApplications: AssistantApplication[]
}
