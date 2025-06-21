import { Injectable } from '@nestjs/common'
import { IUsersRepository } from './users.repository.interface'
import { User, UserDocument } from '../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from 'src/common/base.repository'

@Injectable()
export class UsersRepository
  extends BaseRepository<UserDocument>
  implements IUsersRepository
{
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {
    super(userModel)
  }
}
