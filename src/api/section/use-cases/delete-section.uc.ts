import { Inject, Injectable } from '@nestjs/common'
import { SectionHelper } from 'src/domain/helpers/section.helper'
import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'

@Injectable()
export class DeleteSectionUseCase {
	constructor(
		@Inject('SectionRepository')
		private readonly sectionRepository: ISectionRepository
	) {}

	execute = async (sectionId: string): Promise<void> => {
		const section = await SectionHelper.validateSection(
			this.sectionRepository,
			sectionId
		)

		section.active = false
		await this.sectionRepository.update(section)
	}
}
