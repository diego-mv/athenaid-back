import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'
import { SubjectModule } from './subject/subject.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		RoleModule,
		AuthModule,
		SubjectModule
	],
	providers: []
})
export class AppModule {}
