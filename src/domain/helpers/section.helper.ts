import { ISectionRepository } from 'src/domain/interface/repositories/section.repository'
import { Entities } from 'src/models'

export class SectionHelper {
	static async validateSection(
		sectionRepository: ISectionRepository,
		sectionId: string
	): Promise<Entities.Section> {
		const section = await sectionRepository.getById(sectionId)
		if (!section) {
			throw new Error('Section not found')
		}
		return section
	}
}
