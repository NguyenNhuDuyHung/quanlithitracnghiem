import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'
import { IBaseRepository } from './base.repository.interface'

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populate?: string | string[]
  ): Promise<T | null> {
    let query = this.model.findOne(entityFilterQuery, {
      // _id: 0,
      // __v: 0,
      ...projection,
    })

    if (populate) query = query.populate(populate)
    return query.exec()
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populate?: string | string[],
    sort?: Record<string, 1 | -1>,
    limit: number = 5,
    skip?: number
  ): Promise<T[] | null> {
    let query = this.model.find(entityFilterQuery, {
      // _id: 0,
      // __v: 0,
      ...projection,
    })
    if (populate) query = query.populate(populate)
    if (sort) query = query.sort(sort)
    if (limit) query = query.limit(limit)
    if (skip) query = query.skip(skip)
    return query.exec()
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.model(createEntityData)
    return entity.save()
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    })
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.model.deleteMany(entityFilterQuery)
    return deleteResult.deletedCount >= 1
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.model.deleteOne(entityFilterQuery)
    return deleteResult.deletedCount >= 1
  }
}
