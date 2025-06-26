import {
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator'

export class CreateClassGroupDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string

  @IsNotEmpty({ message: 'Academic year is required' })
  @IsInt({ message: 'Academic year must be an integer' })
  @Min(2000, { message: 'Academic year must be at least 2000' })
  @Max(2099, { message: 'Academic year must be at most 2099' })
  academicYear: number

  @IsNotEmpty({ message: 'Semester is required' })
  @IsIn([1, 2, 3], { message: 'Semester must be either 1, 2, or 3' })
  semester: number

  @IsOptional()
  @IsUUID('4', { message: 'Invite code must be a valid UUID' })
  @IsString({ message: 'Invite code must be a string' })
  inviteCode?: string

  @IsOptional()
  @IsString({ message: 'Lecturer ID must be a string' })
  @IsMongoId({ message: 'Lecturer ID must be a valid MongoDB ID' })
  lecturer: string

  @IsOptional()
  @IsString({ message: 'Subject ID must be a string' })
  @IsMongoId({ message: 'Subject ID must be a valid MongoDB ID' })
  subjectId: string
}
