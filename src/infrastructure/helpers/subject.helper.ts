import { ISubjectRepository } from 'src/domain/interface/repositories/subject.repository'
import { Entities } from 'src/models'

export class SubjectHelper {
	static async validateSubject(
		subjectRepository: ISubjectRepository,
		subjectId: string
	): Promise<Entities.Subject> {
		const subject = await subjectRepository.getById(subjectId)
		if (!subject) {
			throw new Error('Subject not found')
		}
		return subject
	}
}
