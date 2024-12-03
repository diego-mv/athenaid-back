import {
	Entity,
	PrimaryColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany
} from 'typeorm'
import { Subject } from './subject.entity'
import { Assistant } from './assistant.entity'

@Entity('section')
export class Section {
	@PrimaryColumn()
	id: string

	@Column({ length: 64 })
	code: string

	@Column({ default: true, type: Boolean })
	active: boolean

	@Column({ name: 'subject_id' })
	subject_id: string

	@ManyToOne(() => Subject, (subject) => subject.sectionsRel, {
		nullable: true,
		onDelete: 'SET NULL'
	})
	@JoinColumn({ name: 'subject_id' })
	subjectRel?: Subject

	@OneToMany(() => Assistant, (assistant) => assistant.sectionRel, {
		nullable: false,
		onDelete: 'CASCADE'
	})
	assistantsRel?: Assistant[]
}
