import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Schemas } from 'src/models'

@Injectable()
export class JwtTokenService {
	constructor(private readonly jwtService: JwtService) {}

	generateToken(payload: Schemas.UserJwtPayload): string {
		return this.jwtService.sign(payload)
	}

	verifyToken(token: string): any {
		return this.jwtService.verify(token)
	}
}
