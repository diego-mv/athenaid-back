import { Injectable } from '@nestjs/common'
import { FindOptionsWhere, Repository as TypeOrmRepository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

type AtLeastOne<T> = {
	[K in keyof T]: Pick<T, K>
}[keyof T]

@Injectable()
export class GenericRepository<T extends { id: string }> {
	constructor(readonly repository: TypeOrmRepository<T>) {}

	get = async (where: AtLeastOne<T>): Promise<T[]> => {
		return await this.repository.find({
			where: { ...where } as FindOptionsWhere<T>
		})
	}

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

	update = async (entity: T): Promise<T> => {
		await this.repository.update(
			{ id: entity.id } as FindOptionsWhere<T>,
			entity as QueryDeepPartialEntity<T>
		)

		return await this.getById(entity.id)
	}
}
