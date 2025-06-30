import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type PermissionDocument = HydratedDocument<Permissions>

@Schema({ timestamps: true })
export class Permissions {
  @Prop({ required: true })
  moduleName: string

  @Prop({
    required: true,
    enum: ['read', 'create', 'update', 'delete', 'join'],
  })
  action: string

  @Prop({ required: false })
  description?: string
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions)
