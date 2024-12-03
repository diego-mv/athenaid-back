export interface IGenericRepository<T> {
	getAll(): Promise<T[]>
	getById(id: string): Promise<T | null>
	create(entity: T): Promise<T>
	delete(id: string): Promise<void>
}
