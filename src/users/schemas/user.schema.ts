import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: false })
  password: string

  @Prop({ required: true })
  fullname: string

  @Prop({ required: false })
  phone?: string

  @Prop({ required: false, enum: ['male', 'female'] })
  gender?: string

  @Prop({ required: false, default: null })
  birth?: Date

  @Prop({ required: false })
  avatar?: string

  @Prop({ required: true, default: 'local', enum: ['local', 'google'] })
  type: string

  @Prop({ required: false })
  otp?: string

  @Prop({ required: false })
  otpExpire?: Date

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserCatalogues' })
  userCatalogueId?: mongoose.Schema.Types.ObjectId

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassGroup' }] })
  classGroupId?: mongoose.Schema.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
