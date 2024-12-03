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

	@Column({ name: 'period_id' })
	period_id: string

	@ManyToOne(() => Period, (period) => period.eventApplicationsRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'period_id' })
	periodRel: Period

	@Column()
	startdate: Date

	@Column()
	enddate: Date

	@Column({ name: 'created_by' })
	created_by: string

	@ManyToOne(() => User, (user) => user.createdEventsRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'created_by' })
	createdByRel: User

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.eventRel
	)
	assistantApplicationsRel: AssistantApplication[]
}
