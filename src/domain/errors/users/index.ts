import { BadRequestException } from '@nestjs/common'

export class ErrorUpdateRole extends BadRequestException {
	constructor(message?: string, errorCode?: string) {
		super(
			{
				message: message || 'An error occurred while updating the role.',
				errorCode: errorCode || 'ERROR_UPDATE_ROLE'
			},
			'Update Role Error'
		)
	}
}
