import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { Schemas } from 'src/models'

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): Schemas.UserJwtPayload => {
		const request = context.switchToHttp().getRequest<Request>()
		return request.user as Schemas.UserJwtPayload
	}
)
