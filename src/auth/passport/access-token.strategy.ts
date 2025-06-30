import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../../users/services/users.service'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token'
) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'DEFAULT_SECRET_KEY'
      ),
    })
  }

  async validate(payload: any) {
    return {
      _id: payload._id,
      email: payload.email,
      userCatalogueId: payload.userCatalogueId,
    }
  }
}
