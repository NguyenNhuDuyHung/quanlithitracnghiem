import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class LoginUserDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string

  @IsOptional()
  @IsString({ message: 'OTP must be a string' })
  otp?: string

  @IsOptional()
  @IsDate({ message: 'OTP Expiration must be a valid date' })
  otpExpire?: Date
}
