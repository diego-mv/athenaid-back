import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.entity'
import { Section } from './section.entity'
import { Period } from './period.entity'

@Entity('assistant')
export class Assistant {
	@PrimaryColumn()
	id: string

	@ManyToOne(() => User, (user) => user.assistants, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Section, (section) => section.assistants, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'section_id' })
	section: Section

	@ManyToOne(() => Period, (period) => period.assistants, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'period_id' })
	period: Period
}
