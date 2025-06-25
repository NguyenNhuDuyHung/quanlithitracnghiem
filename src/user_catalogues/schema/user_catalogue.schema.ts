import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserCataloguesDocument = HydratedDocument<UserCatalogues>

@Schema({ timestamps: true })
export class UserCatalogues {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ default: true })
  status: boolean
}

export const UserCataloguesSchema = SchemaFactory.createForClass(UserCatalogues)
