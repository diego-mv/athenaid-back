import { Injectable } from '@nestjs/common'
import { PaginatedData } from 'src/domain/models/shared'
import {
	Brackets,
	FindOptionsWhere,
	SelectQueryBuilder,
	Repository as TypeOrmRepository
} from 'typeorm'
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

	getPaginatedByQueryBuilder = async (
		queryBuilder: SelectQueryBuilder<T>,
		options?: {
			page: number
			pageSize: number
			filter?: string
			filterBy?: (keyof T)[]
		}
	): Promise<PaginatedData<T>> => {
		const { page, pageSize, filter, filterBy } = options

		if (filter && filterBy.length) {
			const filterConditions = filterBy
				.map(
					(field) =>
						`LOWER(${queryBuilder.alias}.${field as string}) LIKE :filter`
				)
				.join(' OR ')

			queryBuilder.andWhere(`(${filterConditions})`, {
				filter: `%${filter.toLowerCase()}%`
			})
		}

		const total = await queryBuilder.getCount()

		queryBuilder.skip((page - 1) * pageSize).take(pageSize)

		const data = await queryBuilder.getMany()

		return { data, total, page, pageSize }
	}

	getPaginated = async (
		where: AtLeastOne<T> | object,
		options?: {
			page: number
			pageSize: number
			filter?: string
			filterBy?: (keyof T)[]
		}
	): Promise<PaginatedData<T>> => {
		const { page = 1, pageSize = 10, filter, filterBy } = options
		const offset = (page - 1) * pageSize
		let query = this.repository
			.createQueryBuilder('entity')
			.skip(offset)
			.take(pageSize)

		Object.keys(where).forEach((key) => {
			query = query.andWhere(`entity.${key} = :${key}`, { [key]: where[key] })
		})

		if (filter && filterBy && filterBy.length > 0) {
			query = query.andWhere(
				new Brackets((qb) => {
					filterBy.forEach((field) => {
						qb.orWhere(`entity.${field as string} ILIKE :filterText`, {
							filterText: `%${filter}%`
						})
					})
				})
			)
		}

		const data = await query.getMany()

		let countQuery = this.repository.createQueryBuilder('entity')

		Object.keys(where).forEach((key) => {
			countQuery = countQuery.andWhere(`entity.${key} = :${key}`, {
				[key]: where[key]
			})
		})

		if (filter && filterBy && filterBy.length > 0) {
			countQuery = countQuery.andWhere(
				new Brackets((qb) => {
					filterBy.forEach((field) => {
						qb.orWhere(`entity.${field as string} ILIKE :filterText`, {
							filterText: `%${filter}%`
						})
					})
				})
			)
		}

		const total = await countQuery.getCount()

		return { total, data, page, pageSize }
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
