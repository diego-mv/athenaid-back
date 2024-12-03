import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/api.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	patchNestJsSwagger()
	const config = new DocumentBuilder()
		.setTitle('Athenaid')
		.setDescription('Backend Athenaid')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = () => SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document, {
		jsonDocumentUrl: 'swagger/json'
	})

	await app.listen(process.env.PORT ?? 8080)
}

bootstrap()
