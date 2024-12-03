import { Module } from '@nestjs/common'
import {
	getDataSource,
	getRoleRepository,
	getUserRepository
} from 'src/dependency-injection'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.uc'
import { UpdateUserRoleUseCase } from './use-cases/update-user-role'

@Module({
	controllers: [UserController],
	providers: [
		{
			provide: 'UserRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getUserRepository(dataSource)
			}
		},
		{
			provide: 'RoleRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getRoleRepository(dataSource)
			}
		},
		//Use Cases
		CreateUserUseCase,
		UpdateUserRoleUseCase
	]
})
export class UserModule {}
