import { BadRequestException } from '@nestjs/common'

export class ErrorLogin extends BadRequestException {
	constructor(message?: string, errorCode?: string) {
		super(
			{
				message: message || 'An error occurred on login',
				errorCode: errorCode || 'ERROR_LOGIN'
			},
			'Login Error'
		)
	}
}

export class ErrorUpdatePassword extends BadRequestException {
	constructor(message?: string, errorCode?: string) {
		super(
			{
				message: message || 'An error occurred while updating the password.',
				errorCode: errorCode || 'ERROR_UPDATE_PASS'
			},
			'Update Password Error'
		)
	}
}
