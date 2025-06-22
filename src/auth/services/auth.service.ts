import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from 'src/users/repositories/users.repository'
import { comparePassword } from 'src/utils/validation.pipe'

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ email })
    if (!user || !comparePassword(password, user.password)) {
      return null
    }

    return user
  }

  async login(user: any) {
    const payload = { email: user.email, _id: user._id }

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRES_IN'
        ),
      }),
    }
  }

  async refreshToken(userId: string) {
    const user = await this.usersRepository.findOne({ _id: userId })
    if (!user) {
      throw new UnauthorizedException()
    }

    const payload = {
      email: user.email,
      _id: user._id,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
