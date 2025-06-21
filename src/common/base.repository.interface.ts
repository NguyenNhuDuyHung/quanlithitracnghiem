export interface IBaseRepository<T> {
  findOne(
    entityFilterQuery: Partial<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null>
  find(entityFilterQuery: Partial<T>): Promise<T[] | null>
  create(createEntityData: unknown): Promise<T>
  findOneAndUpdate(
    entityFilterQuery: Partial<T>,
    updateEntityData: unknown
  ): Promise<T | null>
  deleteMany(entityFilterQuery: Partial<T>): Promise<boolean>
  deleteOne(entityFilterQuery: Partial<T>): Promise<boolean>
}
