import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { JwtTokenService } from 'src/api/auth/jwt-token.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtTokenService: JwtTokenService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest<Request>()
			const token = this.extractTokenFromHeader(request)

			if (!token) {
				throw new UnauthorizedException('No token provided')
			}

			const payload = await this.jwtTokenService.verifyToken(token)
			request.user = payload

			return true
		} catch (err: any) {
			console.error(err)
			throw new UnauthorizedException('No token provided')
		}
	}

	private extractTokenFromHeader(request: Request): string | null {
		const authHeader = request.headers.authorization
		if (authHeader?.startsWith('Bearer ')) {
			return authHeader.substring(7)
		}
		return null
	}
}
