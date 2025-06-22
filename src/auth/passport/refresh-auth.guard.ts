import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_REFRESH_KEY } from './decorator'

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard('refresh-token') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isRefreshToken = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_KEY,
      [context.getHandler(), context.getClass()]
    )

    if (!isRefreshToken) {
      throw new UnauthorizedException('Not allowed to use refresh token here')
    }

    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    //You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Refesh Token is expired or invalid')
      )
    }
    return user
  }
}
