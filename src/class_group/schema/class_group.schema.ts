import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type ClassGroupDocument = HydratedDocument<ClassGroup>

@Schema({ timestamps: true })
export class ClassGroup {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  inviteCode: string

  @Prop({ required: false })
  description?: string

  @Prop({ required: true })
  academicYear: number

  @Prop({ required: true })
  semester: number

  @Prop({ default: true })
  status: boolean

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  lecturer: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' })
  subjectId: mongoose.Types.ObjectId
}

export const ClassGroupSchema = SchemaFactory.createForClass(ClassGroup)
