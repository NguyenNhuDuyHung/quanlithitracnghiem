import { CHECK_ABILITY, IS_PUBLIC_KEY, RequiredRule } from './decorator'
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from '../../casl/casl-ability.factory'
import { ForbiddenError } from '@casl/ability'

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      []

    const { user } = context.switchToHttp().getRequest()
    const ability = await this.caslAbilityFactory.createForUser(user)

    if (!ability) {
      throw new ForbiddenException('No ability generated for user')
    }

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
      )
      return true
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException("You don't have permission to do that")
      }
    }
    return false
  }
}
