import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { User } from './user.entity'
import { Section } from './section.entity'
import { Period } from './period.entity'

@Entity('assistant')
export class Assistant {
	@PrimaryColumn()
	id: string

	@Column({ name: 'user_id' })
	user_id: string

	@ManyToOne(() => User, (user) => user.assistantsRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'user_id' })
	userRel: User

	@ManyToOne(() => Section, (section) => section.assistantsRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'section_id' })
	sectionRel: Section

	@Column({ name: 'section_id' })
	section_id: string

	@Column({ name: 'period_id' })
	period_id: string

	@ManyToOne(() => Period, (period) => period.assistantsRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'period_id' })
	periodRel: Period
}
