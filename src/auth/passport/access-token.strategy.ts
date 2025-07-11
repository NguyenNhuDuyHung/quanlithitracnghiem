import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token'
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies['access_token']
          }
          return null
        },
      ]),
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
