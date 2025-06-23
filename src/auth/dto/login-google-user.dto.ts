import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class LoginGoogleUserDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsNotEmpty({ message: 'Fullname is required' })
  @IsString({ message: 'Fullname must be a string' })
  fullname: string

  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsString()
  @IsNotEmpty()
  avatar: string

  @IsString()
  @IsNotEmpty()
  @IsEnum(['google'])
  type: string
}
