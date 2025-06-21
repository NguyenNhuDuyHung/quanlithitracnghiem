import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { timestamp } from 'rxjs'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
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

  @Prop({ required: false })
  otp?: string

  @Prop({ required: false })
  otpExpire?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
