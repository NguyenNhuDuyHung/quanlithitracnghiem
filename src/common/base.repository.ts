import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'
import { IBaseRepository } from './base.repository.interface'

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T | null> {
    return this.model
      .findOne(entityFilterQuery, {
        // _id: 0,
        // __v: 0,
        ...projection,
      })
      .exec()
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>
  ): Promise<T[] | null> {
    return this.model.find(entityFilterQuery, {
      // _id: 0,
      // __v: 0,
      ...projection,
    })
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
