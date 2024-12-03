import { Module } from '@nestjs/common'
import { getDataSource, getRoleRepository } from 'src/dependency-injection'
import { CreateRoleUseCase } from './use-cases/create-role.uc'
import { RoleController } from './role.controller'
import { GetAllRoleUseCase } from './use-cases/get-all.uc'

@Module({
	controllers: [RoleController],
	providers: [
		GetAllRoleUseCase,
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
