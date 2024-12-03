import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { User } from './user.entity'
import { Subject } from './subject.entity'

@Entity('subject_coordinator')
export class SubjectCoordinator {
	@PrimaryColumn()
	id: string

	@Column('coordinatorid')
	coordinator_id: string

	@Column('subject_id')
	subject_id: string

	@ManyToOne(() => User, (user) => user.subjectCoordinatorsRel)
	@JoinColumn({ name: 'coordinator_id' })
	coordinatorRel: User

	@ManyToOne(() => Subject, (subject) => subject.subjectCoordinatorsRel)
	@JoinColumn({ name: 'subject_id' })
	subjectRel: Subject
}
