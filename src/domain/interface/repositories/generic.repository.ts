export interface IGenericRepository<T> {
	getById(id: string): Promise<T | null>
	create(entity: T): Promise<T>
}
