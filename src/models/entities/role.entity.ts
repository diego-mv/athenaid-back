import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('roles')
export class Role {
	@PrimaryColumn()
	id: string

	@Column({ length: 64 })
	name: string

	@OneToMany(() => User, (user) => user.role)
	users?: User[]
}
