import { Module } from '@nestjs/common'
import {
	getDataSource,
	getRoleRepository,
	getUserRepository
} from 'src/dependency-injection'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './create-user.uc'

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
		CreateUserUseCase
	]
})
export class UserModule {}
