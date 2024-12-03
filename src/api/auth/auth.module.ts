import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { getDataSource, getUserRepository } from 'src/dependency-injection'
import { AuthController } from './auth.controller'
import { LoginUseCase } from './use-cases/login.uc'
import { JwtTokenService } from './jwt-token.service'
import { JwtAuthGuard } from 'src/infrastructure/server/guards/jwt-auth.guard'

@Global()
@Module({
	controllers: [AuthController],
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: '1h' }
			})
		})
	],
	providers: [
		JwtAuthGuard,
		JwtTokenService,
		LoginUseCase,
		{
			provide: 'UserRepository',
			useFactory: async () => {
				const dataSource = await getDataSource()
				return getUserRepository(dataSource)
			}
		}
	],
	exports: [JwtAuthGuard, JwtTokenService]
})
export class AuthModule {}
