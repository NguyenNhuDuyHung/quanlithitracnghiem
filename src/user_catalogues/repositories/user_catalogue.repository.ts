import { Injectable } from '@nestjs/common'
import { UserCataloguesDocument } from '../schema/user_catalogue.schema'
import { IUserCataloguesRepository } from './user_catalogue.repository.interface'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from 'src/common/base.repository'

@Injectable()
export class UserCataloguesRepository
  extends BaseRepository<UserCataloguesDocument>
  implements IUserCataloguesRepository
{
  constructor(
    @InjectModel('UserCatalogues')
    private readonly userCataloguesModel: Model<UserCataloguesDocument>
  ) {
    super(userCataloguesModel)
  }
}
