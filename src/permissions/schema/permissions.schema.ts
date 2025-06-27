import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type PermissionDocument = HydratedDocument<Permissions>

@Schema({ timestamps: true })
export class Permissions {
  @Prop({ required: true, unique: true })
  moduleName: string

  @Prop({
    required: true,
    enum: ['read', 'create', 'update', 'delete', 'join'],
    type: [String],
  })
  action: string[]
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions)
