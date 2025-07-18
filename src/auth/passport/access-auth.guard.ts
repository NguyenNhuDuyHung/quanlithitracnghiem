import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './decorator'

@Injectable()
export class AccessTokenAuthGuard extends AuthGuard('access-token') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true
    
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    //You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Access Token is expired or invalid')
      )
    }
    return user
  }
}
