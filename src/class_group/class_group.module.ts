import { Module } from '@nestjs/common'
import { ClassGroupService } from './services/class_group.service'
import { ClassGroupController } from './class_group.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ClassGroup, ClassGroupSchema } from './schema/class_group.schema'
import { ClassGroupRepository } from './repositories/class_group.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClassGroup.name,
        schema: ClassGroupSchema,
      },
    ]),
  ],
  controllers: [ClassGroupController],
  providers: [ClassGroupService, ClassGroupRepository],
})
export class ClassGroupModule {}
