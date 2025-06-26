import { Injectable } from '@nestjs/common'
import { BaseRepository } from '../../common/base.repository'
import { IClassGroupRepository } from './class_group.repository.interface'
import { ClassGroupDocument } from '../schema/class_group.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ClassGroupRepository
  extends BaseRepository<ClassGroupDocument>
  implements IClassGroupRepository
{
  constructor(
    @InjectModel('ClassGroup')
    private readonly classGroupModel: Model<ClassGroupDocument>
  ) {
    super(classGroupModel)
  }
}
