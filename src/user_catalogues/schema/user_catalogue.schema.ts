import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type UserCataloguesDocument = HydratedDocument<UserCatalogues>

@Schema({ timestamps: true })
export class UserCatalogues {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ default: true })
  status: boolean

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
  })
  permissions: mongoose.Schema.Types.ObjectId[]
}

export const UserCataloguesSchema = SchemaFactory.createForClass(UserCatalogues)
