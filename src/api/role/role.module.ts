import { Module } from '@nestjs/common'
import { getDataSource, getRoleRepository } from 'src/dependency-injection'
import { CreateRoleUseCase } from './create-role.uc'
import { RoleController } from './role.controller'

@Module({
	controllers: [RoleController],
	providers: [
		CreateRoleUseCase,
		{
			provide: 'RoleRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getRoleRepository(dataSource)
			}
		}
	]
})
export class RoleModule {}
