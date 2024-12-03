import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { AssistantApplication } from './assistant_application.entity'

@Entity('state_application')
export class StateApplication {
	@PrimaryColumn()
	id: string

	@Column({ length: 128 })
	name: string

	@OneToMany(
		() => AssistantApplication,
		(assistantApplication) => assistantApplication.state
	)
	assistantApplications: AssistantApplication[]
}
