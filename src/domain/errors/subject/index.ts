import { BadRequestException } from '@nestjs/common'

export class ErrorCreateSubject extends BadRequestException {
	constructor(message?: string, errorCode?: string) {
		super(
			{
				message: message || 'An error occurred while create the subject.',
				errorCode: errorCode || 'ERROR_CREATE_SUBJECT'
			},
			'Create Subject Error'
		)
	}
}

export class ErrorUpdateSubject extends BadRequestException {
	constructor(message?: string, errorCode?: string) {
		super(
			{
				message: message || 'An error occurred while update the subject.',
				errorCode: errorCode || 'ERROR_UPDATE_SUBJECT'
			},
			'Update Subject Error'
		)
	}
}
