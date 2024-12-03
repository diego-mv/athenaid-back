import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/api.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(process.env.PORT ?? 8080)
}

bootstrap()