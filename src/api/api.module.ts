import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [ConfigModule.forRoot(), UserModule, RoleModule],
	providers: []
})
export class AppModule {}
