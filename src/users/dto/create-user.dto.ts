import { Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string

  @IsNotEmpty({ message: 'Fullname is required' })
  @IsString({ message: 'Fullname must be a string' })
  fullname: string

  @IsPhoneNumber('VN', {
    message: 'Phone number must be a valid Vietnamese phone number',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone?: string

  @IsOptional()
  @IsIn(['male', 'female'], {
    message: 'Gender must be either "male" or "female"',
  })
  gender?: string

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Date of birth must be a valid date' })
  birth?: Date

  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  avatar?: string

  @IsOptional()
  @IsString({ message: 'OTP must be a string' })
  otp?: string

  @IsOptional()
  @IsDate({ message: 'OTP Expiration must be a valid date' })
  otpExpire?: Date
}
