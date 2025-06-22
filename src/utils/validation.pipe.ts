import {
  PipeTransform,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { isValidObjectId } from 'mongoose'
import * as bcrypt from 'bcrypt'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`)
    }
    return value
  }
}

export const hashPassword = (password: string): string => {
  try {
    return bcrypt.hashSync(password, 10)
  } catch (error) {
    throw new UnauthorizedException(error)
  }
}

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  } catch (error) {
    throw new UnauthorizedException(error)
  }
}
