import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BaseRepository } from 'src/common/base.repository'
import { PermissionDocument } from '../schema/permissions.schema'
import { IPermissionsRepository } from './permissions.repository.interface'

@Injectable()
export class PermissionsRepository
  extends BaseRepository<PermissionDocument>
  implements IPermissionsRepository
{
  constructor(
    @InjectModel('Permissions')
    private readonly permissionModel: Model<PermissionDocument>
  ) {
    super(permissionModel)
  }
}
