import { Module } from '@nestjs/common'
import { PermissionsService } from './services/permissions.service'
import { PermissionsController } from './permissions.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Permissions, PermissionsSchema } from './schema/permissions.schema'
import { PermissionsRepository } from './repositories/permissions.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Permissions.name, schema: PermissionsSchema }]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsRepository],
})
export class PermissionsModule {}
