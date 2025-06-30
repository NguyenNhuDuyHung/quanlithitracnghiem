import { Module } from '@nestjs/common'
import { UserCataloguesController } from './user_catalogues.controller'
import { UserCataloguesService } from './services/user_catalogues.service'
import { UserCataloguesRepository } from './repositories/user_catalogue.repository'
import { MongooseModule } from '@nestjs/mongoose'
import {
  UserCatalogues,
  UserCataloguesSchema,
} from './schema/user_catalogue.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCatalogues.name, schema: UserCataloguesSchema },
    ]),
  ],
  controllers: [UserCataloguesController],
  providers: [UserCataloguesService, UserCataloguesRepository],
  exports: [UserCataloguesService, UserCataloguesRepository],
})
export class UserCataloguesModule {}
