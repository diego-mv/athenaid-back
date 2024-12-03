import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Section } from './section.entity'
import { SubjectCoordinator } from './subject_coordinator.entity'
import { AssistantApplication } from './assistant_application.entity'

@Entity('subject')
export class Subject {
	@PrimaryColumn()
	id: string

	@Column({ length: 64 })
	code: string

	@Column({ length: 64 })
	name: string

	@Column({ name: 'color_hex', length: 32, default: '0000ff' })
	colorHex: string

	@Column({ default: true })
	active: boolean

	@OneToMany(() => Section, (section) => section.subjectRel)
	sectionsRel?: Section[]

	@OneToMany(
		() => SubjectCoordinator,
		(subjectCoordinator) => subjectCoordinator.subjectRel
	)
	subjectCoordinatorsRel?: SubjectCoordinator[]

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.subjectRel
	)
	assistantApplicationsRel?: AssistantApplication[]
}
