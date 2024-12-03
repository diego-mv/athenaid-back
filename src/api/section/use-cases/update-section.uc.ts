import { Inject, Injectable } from '@nestjs/common'
import { SectionHelper } from 'src/domain/helpers/section.helper'
import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'
import { Entities, Schemas } from 'src/models'

@Injectable()
export class UpdateSectionUseCase {
	constructor(
		@Inject('SectionRepository')
		private readonly sectionRepository: ISectionRepository
	) {}

	execute = async (
		sectionData: Schemas.UpdateSectionDto
	): Promise<Entities.Section> => {
		const section = await SectionHelper.validateSection(
			this.sectionRepository,
			sectionData.id
		)

		section.code = sectionData.code
		section.active = sectionData.active

		return await this.sectionRepository.update(section)
	}
}
