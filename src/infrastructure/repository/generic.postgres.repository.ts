import { Injectable } from '@nestjs/common'
import { FindOptionsWhere, Repository as TypeOrmRepository } from 'typeorm'

@Injectable()
export class GenericRepository<T extends { id: string }> {
	constructor(readonly repository: TypeOrmRepository<T>) {}

	getById = async (id: string): Promise<T | undefined> => {
		return await this.repository.findOne({
			where: { id: id } as FindOptionsWhere<T>
		})
	}

	getAll = async (): Promise<T[]> => {
		return await this.repository.find()
	}

	create = async (entity: T): Promise<T> => {
		return await this.repository.save(entity)
	}

	delete = async (id: string): Promise<void> => {
		await this.repository.delete(id)
	}
}
